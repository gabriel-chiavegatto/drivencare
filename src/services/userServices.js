async function create({ type, name, email, password, crm, cpf, phone, locale }) {
    if (!crm && !cpf) throw new Error
    if (crm) {
        const { rowCount } = await doctorRepositories.findByEmail(email)
        const { rowCount: crmRowCount } = await doctorRepositories.findByCrm(crm)
        if (rowCount || crmRowCount) throw new Error

        const hashPassword = await bcrypt.hash(password,10);
        await doctorRepositories.create({name, email, password: hashPassword, crm, specialty})
    }
    if (cpf) {
        const { rowCount } = await patientRepositories.findByEmail(email)
        const { rowCount: cpfRowCount } = await patientRepositories.findByCpf(cpf)
        if (rowCount || cpfRowCount) throw new Error

        const hashPassword = await bcrypt.hash(password,10);
        await patientRepositories.create({name, email, password:hashPassword, cpf, phone})
    }

}

export default { create }