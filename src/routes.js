const router = require('express').Router()

const ClinicController = require('./controllers/ClinicController')
//import controllers
const UserController = require("./controllers/UserController")

router.get('/', UserController.app)
router.post('/criarPaciente', UserController.criarPaciente)
router.post('/login', UserController.login)
router.get('/listaPacientes', UserController.getUsers)
router.post('/createClinica', ClinicController.createClinic)
router.get('/listaClinicas', ClinicController.getClinic)

module.exports = router