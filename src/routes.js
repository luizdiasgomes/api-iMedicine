const router = require('express').Router()

const ClinicaController = require('./controllers/ClinicaController')
//import controllers
const UserController = require("./controllers/UserController")

router.get('/', UserController.app)
router.post('/criarPaciente', UserController.criarPaciente)
router.post('/login', UserController.login)
router.get('/listaClinicas', ClinicaController.getClinicas)
router.get('/listaClinicas/:id', ClinicaController.getClinicaById)
router.get('/listaPacientes', UserController.getUsers)
router.post('/createClinica', ClinicaController.createClinic)
router.post('/createClinica', ClinicaController.createClinic)
router.post('/loginAdm', ClinicaController.loginAdm)

module.exports = router