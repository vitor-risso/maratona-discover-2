const express = require("express")
const routes = express.Router()

const basePath = __dirname + "/views/"

const profile = {
  name: "Vitor Hugo",
  avatar: "https://github.com/vitor-risso.png",
  "vacation-per-year": 1,
  "days-per-week":5,
  "hours-per-day": 8,
  "monthly-budget": 3000,

}

routes.get('/', (req, res) => res.render(basePath + "index") )
routes.get('/job', (req, res) => res.render(basePath + "job") )
routes.post('/job', (req, res) => {
  console.log("Save data")
} )
routes.get('/job-edit', (req, res) => res.render(basePath + "job-edit") )
routes.get('/profile', (req, res) => res.render(basePath + "profile", { profile }) )


module.exports = routes
