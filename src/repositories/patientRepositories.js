import { connectionDb } from "../config/database.js"

async function create({name, email, password, cpf, phone}) {
    console.log("TRYYY")
    return await connectionDb.query(`
        INSERT INTO patients (name, email, password, cpf, phone)
        VALUES ($1,$2,$3,$4,$5)
    `, [name, email, password, cpf, phone])
}
async function findByEmail(email) {
    return await connectionDb.query(`
        SELECT * FROM patients 
        WHERE email = $1
    `, [email])
}
async function findByCpf(cpf) {
    return await connectionDb.query(`
        SELECT * FROM patients
        WHERE cpf = $1
    `, [cpf])
}

export default {create, findByCpf, findByEmail}