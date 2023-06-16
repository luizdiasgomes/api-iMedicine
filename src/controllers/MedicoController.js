const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async getMedicoById(req, res) {
        const response = { ...responseModel }
        const { id } = req.params;

        const [, data] = await connection.query(`
        SELECT * 
        FROM medico m   
        WHERE m.clinica_id  = ${id};
        `)

        response.success = data.length > 0
        response.data = data

        return res.json(response)
    },


    async criarMedico(req, res) {
        const response = { ...responseModel }

        const { nome, especialidade, clinica_id, crm } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO medico VALUES (DEFAULT, '${nome}', '${especialidade}', ${clinica_id}, '${crm}')
        `)

        response.success = affectRows > 0

        return res.json(response)
    },

}