const router = require('express').Router()

const ClinicaController = require('./controllers/ClinicaController')
const ConsultaController = require('./controllers/ConsultaController')
const ImageController = require('./controllers/ImageController')
const MedicoController = require('./controllers/MedicoController')
//import controllers
const PacienteController = require("./controllers/PacienteController")

router.get('/', PacienteController.app)
router.post('/criarPaciente', PacienteController.criarPaciente)
router.post('/createConsulta', ConsultaController.createConsulta)
router.post('/login', PacienteController.login)
router.get('/listaClinicas', ClinicaController.getClinicas)
router.get('/listaClinicas/:id', ClinicaController.getClinicaById)
router.get('/Clinicas/:email', ClinicaController.getClinicaByEmail)
router.get('/Consultas/Clinica/:email', ConsultaController.getConsultaByClinicaEmail)
router.get('/Consultas/Paciente/:email', ConsultaController.getConsultaByPacienteEmail)
router.get('/listaMedicos/:id', MedicoController.getMedicoById)
router.get('/listaPacientes/:email', PacienteController.getPacienteByEmail)
router.get('/listaPacientes', PacienteController.getUsers)
router.post('/createClinica', ClinicaController.createClinic)
router.post('/createClinica', ClinicaController.createClinic)
router.post('/loginAdm', ClinicaController.loginAdm)

//router.get('/getIdFromPaciente/:email', PacienteController.getIdFromPacienteWhereEmailIs)

router.get('/images/:imageName', ImageController.getImageByName)

module.exports = router