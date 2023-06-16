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
router.post('/createMedico', MedicoController.criarMedico)
router.post('/login', PacienteController.login)
router.get('/listaClinicas', ClinicaController.getClinicas)
router.get('/ClinicasEndereco/:endereco', ClinicaController.buscarClinica)
router.get('/listaClinicas/:id', ClinicaController.getClinicaById)
router.get('/Clinicas/:email', ClinicaController.getClinicaByEmail)


router.put('/Consulta/Aprovada/:id', ConsultaController.AcceptRequestConsulta)
//router.put('/Consulta/Recusada/:id', ConsultaController.DeniedRequestConsulta)

router.put('/Consulta/:id/Recusar', ConsultaController.DeniedRequestConsulta)

router.get('/Consultas/Clinica/:email', ConsultaController.getConsultaByClinicaEmail)
router.get('/Consultas/Paciente/:email', ConsultaController.getConsultaByPacienteEmail)
router.get('/listaMedicos/:id', MedicoController.getMedicoById)
router.get('/listarMedicos/:email', MedicoController.getMedicoByEmailClinic)
router.get('/listaPacientes/:email', PacienteController.getPacienteByEmail)
router.get('/listaPacientes', PacienteController.getUsers)
router.post('/createClinica', ClinicaController.createClinic)
router.post('/createClinica', ClinicaController.createClinic)
router.post('/loginAdm', ClinicaController.loginAdm)

//router.get('/getIdFromPaciente/:email', PacienteController.getIdFromPacienteWhereEmailIs)

router.get('/images/:imageName', ImageController.getImageByName)

module.exports = router