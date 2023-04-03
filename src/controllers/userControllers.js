import userServices from "../services/userServices.js";

async function create(req, res) {
    const { type, name, email, password, crm, cpf, phone, locale } = req.body;

    try {
        await userServices.create({type, name, email, password, crm, cpf, phone, locale})
        



        return res.sendStatus(201)
    } catch (error) {
        
    }

}

export default { create }