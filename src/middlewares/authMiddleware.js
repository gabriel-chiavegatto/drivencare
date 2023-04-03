import doctorRepositories from "../repositories/doctorRepositories.js"
import patientRepositories from "../repositories/patientRepositories.js"

async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");
    if (!token) return res.status(401).send("No token");

    const { type } = req.body
    if (!type) return res.status(401).send("No user type");

    try {
        if (type === "doctor") {
            const { rows: [doctorSession] } = await doctorRepositories.findSessionByToken(token)
            if (!doctorSession) return res.status(401).send("Session not found")

            const { rows: [user] } = await doctorRepositories.findById(doctorSession.doctorId)
            if (!user) return res.status(401).send("User not found")

            res.locals.user = user
            next()
        }

        if (type === "patient") {
            const { rows: [patientSession] } = await patientRepositories.findSessionByToken(token)
            if (!patientSession) return res.status(401).send("Session not found")

            const { rows: [user] } = await patientRepositories.findById(patientSession.doctorId)
            if (!user) return res.status(401).send("User not found")

            res.locals.user = user
            next()
        }
        
        else { res.status(401).send("Type error") }
    } catch (error) {
        res.status(422).send(error.message);
    }
}

export default { authValidation }