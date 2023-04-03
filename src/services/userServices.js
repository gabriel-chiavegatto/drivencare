import doctorRepositories from "../repositories/doctorRepositories.js";
import patientRepositories from "../repositories/patientRepositories.js";
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from "uuid";

async function create({ type, name, email, password, crm, cpf, phone, locale, specialty }) {
    if (!crm && !cpf) throw new Error("document required")
    if (type === 'doctor' && crm) {
        if (!locale || !specialty || crm.length > 8) throw new Error("Data required, crm, locale and specialty")
        const { rowCount: emailRowCount } = await doctorRepositories.findByEmail(email)
        const { rowCount: crmRowCount } = await doctorRepositories.findByCrm(crm)
        if (emailRowCount > 0 || crmRowCount > 0) throw new Error("Doctor exist")

        const hashPassword = await bcrypt.hash(password, 10);
        await doctorRepositories.create({ name, email, password: hashPassword, crm, specialty, locale })
    }
    if (type === 'patient' && cpf) {
        if (!phone) throw new Error("patient need phone number")
        const { rowCount: emailRowCount } = await patientRepositories.findByEmail(email)
        const { rowCount: cpfRowCount } = await patientRepositories.findByCpf(cpf)
        if (emailRowCount > 0 || cpfRowCount > 0) throw new Error

        const hashPassword = await bcrypt.hash(password, 10);
        await patientRepositories.create({ name, email, password: hashPassword, cpf, phone })
    }
    else { throw new Error("Type error") }
}
async function login({ type, email, password }) {
    if (type === 'doctor') {
        const { rows: doctors } = await doctorRepositories.findByEmail(email)
        if(doctors.length === 0) throw new Error('Incorrect email or password')
        const doctor = doctors[0];

        const validPassword = await bcrypt.compare(password, doctor.password);
        if(!validPassword) throw new Error ("Incorrect email or password");

        const token = uuidV4();
        await doctorRepositories.createSession({token, doctorId: doctor.id})

        return token
    }

    if (type === 'patient') {
        const { rows: patients } = await patientRepositories.findByEmail(email)
        if(patients.length === 0) throw new Error('Incorrect email or password')
        const patient = patients[0];

        const validPassword = await bcrypt.compare(password, patient.password);
        if(!validPassword) throw new Error ("Incorrect email or password");

        const token = uuidV4();
        await patientRepositories.createSession({token, patientId: patient.id})

        return token
    }

    else { throw new Error('type error') }
}

export default { create, login }