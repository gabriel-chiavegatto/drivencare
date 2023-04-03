import { connectionDb } from "../config/database.js"

export async function create({name, email, password, crm, specialty, locale}){
    return await connectionDb.query(`
        INSERT INTO doctors (name, email, password, crm, specialty, locale)
        VALUES ($1, $2, $3, $4, $5, $6)
    `, [name, email, password, crm, specialty, locale]);
}

export async function findByEmail(email){
    return await connectionDb.query(`
        SELECT * FROM doctors WHERE email=$1
    `,[email]);
}

export async function findByCrm(crm){
    return await connectionDb.query(`
    SELECT * FROM doctors WHERE crm=$1
    `,[crm]);
}

export default { create }