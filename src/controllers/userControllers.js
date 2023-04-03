import userServices from "../services/userServices.js";

async function create(req, res) {
    const { type, name, email, password, crm, cpf, phone, locale, specialty } = req.body;

    try {
        await userServices.create({ type, name, email, password, crm, cpf, phone, locale, specialty })
        return res.sendStatus(201)
    } catch (error) {
        return res.status(422).send(error.message)
    }

}
async function login(req, res) {
    const { type, email, password } = req.body;
    try {
        const token = await userServices.login({ type, email, password })
        return res.status(200).send({ type, token })
    } catch (error) {
        return res.status(422).send(error.message)
    }
}

export default { create, login }