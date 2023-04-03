import userServices from "../services/userServices.js";

async function create(req, res) {
    const { type, name, email, password, crm, cpf, phone, locale, specialty } = req.body;

    try {
        await userServices.create({type, name, email, password, crm, cpf, phone, locale, specialty})
        return res.sendStatus(201)
    } catch (error) {
        return res.status(422).send(error)
    }

}

export default { create }