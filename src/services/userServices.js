import doctorRepositories from "../repositories/doctorRepositories.js";
import patientRepositories from "../repositories/patientRepositories.js";
import bcrypt from 'bcrypt';

async function create({ type, name, email, password, crm, cpf, phone, locale, specialty }) {
    if (!crm && !cpf) throw new Error("need some data")
    if (type==='doctor' && crm) {
        if(!locale || !specialty || crm.length > 8) throw new Error("Need data")
        const { rowCount: emailRowCount } = await doctorRepositories.findByEmail(email)
        const { rowCount: crmRowCount } = await doctorRepositories.findByCrm(crm)
        if (emailRowCount > 0 || crmRowCount > 0) throw new Error("Doctor exist")

        const hashPassword = await bcrypt.hash(password,10);
        await doctorRepositories.create({name, email, password: hashPassword, crm, specialty, locale})
    }
    if (type==='patient' && cpf) {
        if(!phone) throw new Error ("need phone number")
        const { rowCount: emailRowCount } = await patientRepositories.findByEmail(email)
        const { rowCount: cpfRowCount } = await patientRepositories.findByCpf(cpf)
        if (emailRowCount > 0|| cpfRowCount > 0) throw new Error
        
        const hashPassword = await bcrypt.hash(password,10);
        await patientRepositories.create({name, email, password:hashPassword, cpf, phone})
    }
    else{throw new Error("Type error")}
}

export default { create }