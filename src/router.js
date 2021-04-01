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

const jobs = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    createdAt: Date.now()
  },
  {
    id: 2,
    name: "OneTwo Test",
    "daily-hours": 3,
    "total-hours": 67,
    createdAt: Date.now()
  }
]

routes.get('/', (req, res) => {
 
  const updatedJob = jobs.map(job => {
    const remainingDays = job["total-hours"] / job["daily-hours"].toFixed()

  })


 
 return res.render(basePath + "index", { jobs })

})

routes.get('/job', (req, res) => res.render(basePath + "job") )
routes.post('/job', (req, res) => {
  
  const lastId = jobs[jobs.length - 1]?.id || 1

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    "daily-hours": req.body["daily-hours"],
    "total-hours": red.body["total-hours"],
    createdAt: Date.now()
  })

  return res.redirect('/')
})

routes.get('/job-edit', (req, res) => res.render(basePath + "job-edit") )

routes.get('/profile', (req, res) => res.render(basePath + "profile", { profile }) )


module.exports = routes
