const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {

    async create(req, res) {
        const response = { ...responseModel }

        const { username, password } = req.body;

        const [, affectRows] = await connection.query(`
            INSERT INTO pacientes VALUES (DEFAULT, '${username}', '${password}', NOW(), NOW())
        `)

        response.success = affectRows > 0

        return res.json(response)
    },

    async login(req, res) {
        const response = { ...responseModel }

        const { username, password } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM pacientes WHERE username='${username}' AND password='${password}'
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
    }
}