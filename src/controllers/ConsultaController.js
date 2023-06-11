const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async createConsulta(req, res) {
        const response = { ...responseModel }

        const { medico_id, pacientes_id, data_hora, tipo, observacao, clinica_id, status } = req.body;

        // Verificar se a data é um dia útil (segunda a sexta-feira)
        const consultaDate = new Date(data_hora);
        const dayOfWeek = consultaDate.getDay();

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            response.success = false;
            response.message = 'Não é permitido agendar consultas nos finais de semana.';
            return res.status(400).json(response);
        }

        // Verificar se já existe uma consulta com a mesma data e hora
        const [existingConsultations] = await connection.query(`
          SELECT * FROM consulta WHERE data_hora = '${data_hora}' AND medico_id = ${medico_id}
        `);

        if (existingConsultations.length > 0) {
            response.success = false;
            response.message = 'Já existe uma consulta agendada para a mesma data e hora.';
            return res.status(400).json(response);
        }

        // Inserir a nova consulta no banco de dados
        const [, affectRows] = await connection.query(`
          INSERT INTO consulta VALUES (DEFAULT, ${medico_id}, ${pacientes_id}, '${data_hora}', '${tipo}', '${observacao}', ${clinica_id}, '${status}')
        `);

        response.success = affectRows > 0;

        if (response.success) {
            return res.json(response);
        } else {
            return res.status(422).json(response);
        }
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
    consulta.status,
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

    async getConsultaByClinicaEmail(req, res) {
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
    consulta.status,
    pacientes.username AS nome_do_paciente, 
    medico.nome AS nome_do_medico,
    clinica.titulo AS nome_da_clinica,
    medico.especialidade AS especialidade_medico
FROM 
    consulta 
    INNER JOIN pacientes ON consulta.pacientes_id = pacientes.id 
    INNER JOIN medico ON consulta.medico_id = medico.id
    INNER JOIN clinica ON consulta.clinica_id = clinica.id
WHERE 
    clinica.email = '${email}'
ORDER BY 
    CASE
        WHEN consulta.status = 'Aguardando aprovação' THEN 0
        ELSE 1
    END;

    
        `)

        response.success = data.length > 0
        response.data = data

        return res.json(response)
    },


    async AcceptRequestConsulta(req, res) {
        const response = { ...responseModel };
        const { id } = req.params;

        try {
            const [, data] = await connection.query(`
            UPDATE consulta
            SET status = 'Aprovado'
            WHERE id = ${id};
          `);

            response.success = data.affectedRows > 0;
            response.data = data;

            return res.json(response);
        } catch (error) {
            console.error(error);
            response.message = 'Erro ao atualizar o status da consulta';
            return res.status(500).json(response);
        }
    },

    async DeniedRequestConsulta(req, res) {
        const response = { ...responseModel };
        const { id } = req.params;
        const { justificativa } = req.body; // Nova propriedade para a justificativa

        try {
            const [, data] = await connection.query(`
            UPDATE consulta
            SET status = 'Recusado',
                justificativa = '${justificativa}'
            WHERE id = ${id};
          `);

            response.success = data.affectedRows > 0;
            response.data = data;

            return res.json(response);
        } catch (error) {
            console.error(error);
            response.message = 'Erro ao atualizar o status da consulta';
            return res.status(500).json(response);
        }
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
    consulta.status,
    consulta.justificativa,
    pacientes.username AS nome_do_paciente, 
    medico.nome AS nome_do_medico,
    clinica.titulo AS nome_da_clinica,
    medico.especialidade AS especialidade_medico
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