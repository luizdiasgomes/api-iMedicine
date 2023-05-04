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


}