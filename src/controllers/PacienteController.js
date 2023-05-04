const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async criarPaciente(req, res) {
        const response = { ...responseModel }

        const { username, email, password } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO pacientes VALUES (DEFAULT, '${username}', '${email}', '${password}', NOW(), NOW())
        `)

        response.success = affectRows > 0

        return res.json(response)
    },

    async login(req, res) {
        const response = { ...responseModel }

        const { email, password } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM pacientes WHERE email='${email}' AND password='${password}'
        `)

        response.success = data.length > 0

        return res.json(response)
    },

    async getUsers(req, res) {
        const response = { ...responseModel }

        const [, data] = await connection.query(`
            SELECT * FROM pacientes
        `)

        response.success = true
        response.data = data

        return res.json(response)
    },

    async app(req, res) {
        res.send('API está rodando!');
    },

    async getPacienteByEmail(req, res) {
        const response = { ...responseModel }
        const { email } = req.params;

        const [, data] = await connection.query(`
        SELECT * 
        FROM paciente  
        WHERE email = '${email}';
        `)

        response.success = data.length > 0
        response.data = data

        return res.json(response)
    },


}