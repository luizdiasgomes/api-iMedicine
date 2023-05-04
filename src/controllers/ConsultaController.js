const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

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

    async getConsultaByPacienteId(req, res) {
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
WHERE consulta.pacientes_id = ${id};

    
        `)

        response.success = data.length > 0
        response.data = data

        return res.json(response)
    },



}