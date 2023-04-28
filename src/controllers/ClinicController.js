const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async createClinic(req, res) {
        const response = { ...responseModel }

        const { titulo, horario_atendimento,  endereco, telefone } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO clinica VALUES (DEFAULT, '${titulo}', '${horario_atendimento}', '${endereco}', '${telefone}')
        `)

        response.success = affectRows > 0

        return res.json(response)
    },

    async getClinic(req, res) {
        const response = { ...responseModel }
    
        const [, data] = await connection.query(`
            SELECT * FROM clinica
        `)
    
        response.success = true
        response.data = data
    
        return res.json(response)
    }

}