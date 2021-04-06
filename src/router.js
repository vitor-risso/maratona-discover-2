const express = require("express")
const routes = express.Router()

//controllers
const ProfileController = require('./controllers/profileController')
const JobConroller = require('./controllers/jobController')

routes.get('/', JobConroller.index)

routes.get('/job', JobConroller.create)
routes.post('/job', JobConroller.save)

routes.get('/job/:id', JobConroller.show)
routes.post('/job/:id', JobConroller.update)
routes.post('/job/delete/:id', JobConroller.delete)

routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes
