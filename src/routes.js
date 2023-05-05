const router = require('express').Router()

const ClinicaController = require('./controllers/ClinicaController')
const ConsultaController = require('./controllers/ConsultaController')
const ImageController = require('./controllers/ImageController')
const MedicoController = require('./controllers/MedicoController')
//import controllers
const PacienteController = require("./controllers/PacienteController")

router.get('/', PacienteController.app)
router.post('/criarPaciente', PacienteController.criarPaciente)
router.get('/createConsulta/', ConsultaController.createConsulta)
router.post('/login', PacienteController.login)
router.get('/listaClinicas', ClinicaController.getClinicas)
router.get('/listaClinicas/:id', ClinicaController.getClinicaById)
router.get('/Consultas/Clinica/:id', ConsultaController.getConsultaByClinicaId)
router.get('/Consultas/Paciente/:id', ConsultaController.getConsultaByPacienteId)
router.get('/listaMedicos/:id', MedicoController.getMedicoById)
router.get('/listaPacientes/:email', PacienteController.getPacienteByEmail)
router.get('/listaPacientes', PacienteController.getUsers)
router.post('/createClinica', ClinicaController.createClinic)
router.post('/createClinica', ClinicaController.createClinic)
router.post('/loginAdm', ClinicaController.loginAdm)

router.get('/images/:imageName', ImageController.getImageByName)

module.exports = router