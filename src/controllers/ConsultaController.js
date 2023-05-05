const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async createConsulta(req, res) {
        const response = { ...responseModel }

        const { medico_id, pacientes_id, data_hora, tipo, observacao, clinica_id } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO consulta VALUES (DEFAULT, ${medico_id}, ${pacientes_id}, '${data_hora}', '${tipo}', '${observacao}', ${clinica_id})
        `)

        response.success = affectRows > 0

        return res.json(response)
    },

    async getConsultaByClinicaId(req, res) {
        const response = { ...responseModel }
        const { id } = req.params;

        const [, data] = await connection.query(`
        SELECT 
    consulta.id, 
    consulta.medico_id, 
    consulta.pacientes_id, 
    consulta.data_hora, 
    consulta.tipo, 
    consulta.observacao, 
    pacientes.username AS nome_do_paciente, 
    medico.nome AS nome_do_medico,
    clinica.titulo AS nome_da_clinica
FROM 
    consulta 
    INNER JOIN pacientes ON consulta.pacientes_id = pacientes.id 
    INNER JOIN medico ON consulta.medico_id = medico.id
    INNER JOIN clinica ON consulta.clinica_id = clinica.id
WHERE 
    consulta.clinica_id = ${id};

    
        `)

        response.success = data.length > 0
        response.data = data

        return res.json(response)
    },

    async getConsultaByPacienteEmail(req, res) {
        const response = { ...responseModel }
        const { email } = req.params;

        const [, data] = await connection.query(`
        SELECT 
    consulta.id, 
    consulta.medico_id, 
    consulta.pacientes_id, 
    consulta.data_hora, 
    consulta.tipo, 
    consulta.observacao, 
    pacientes.username AS nome_do_paciente, 
    medico.nome AS nome_do_medico,
    clinica.titulo AS nome_da_clinica
FROM 
    consulta 
    INNER JOIN pacientes ON consulta.pacientes_id = pacientes.id 
    INNER JOIN medico ON consulta.medico_id = medico.id
    INNER JOIN clinica ON consulta.clinica_id = clinica.id
WHERE pacientes.email = '${email}';

    
        `)

        response.success = data.length > 0
        response.data = data

        return res.json(response)
    },



}