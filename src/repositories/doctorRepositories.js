import { connectionDb } from "../config/database.js"

export async function create({ name, email, password, crm, specialty, locale }) {
    return await connectionDb.query(`
        INSERT INTO doctors (name, email, password, crm, specialty, locale)
        VALUES ($1, $2, $3, $4, $5, $6)
    `, [name, email, password, crm, specialty, locale]);
}

export async function findByEmail(email) {
    return await connectionDb.query(`
        SELECT * FROM doctors WHERE email=$1
    `, [email]);
}

export async function findByCrm(crm) {
    return await connectionDb.query(`
        SELECT * FROM doctors WHERE crm=$1
    `, [crm]);
}

export async function createSession({ token, doctorId }) {
    return await connectionDb.query(`
        INSERT INTO "doctorSessions" (token, "doctorId")
        VALUES($1,$2)
    `, [token, doctorId]);
}
export async function findSessionByToken(token) {
    return await connectionDb.query(`
        SELECT * FROM "doctorSessions" WHERE token = $1
    `,[token])
}
export async function findById(doctorId){
    return await connectionDb.query(`
        SELECT * FROM doctors WHERE id=$1
    `, [doctorId])
}

export default { create, findByCrm, findByEmail, createSession, findSessionByToken, findById }