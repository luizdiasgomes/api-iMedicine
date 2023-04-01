const router = require('express').Router()

const ClinicController = require('./controllers/ClinicController')
//import controllers
const UserController = require("./controllers/UserController")

router.get('/', UserController.app)
router.post('/create', UserController.create)
router.post('/login', UserController.login)
router.get('/listaPacientes', UserController.getUsers)
router.post('/createClinic', ClinicController.createClinic)
router.get('/listaClinic', ClinicController.getClinic)

module.exports = router