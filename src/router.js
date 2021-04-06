const express = require("express")
const routes = express.Router()
const profileController = require('./controllers/profileController')


const Profile = {
  data: {
    name: "Vitor Hugo",
    avatar: "https://github.com/vitor-risso.png",
    "vacation-per-year": 1,
    "days-per-week": 5,
    "hours-per-day": 8,
    "monthly-budget": 3000,
    "value-hour": 75
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 600,
      createdAt: Date.now()
    },
    {
      id: 2,
      name: "OneTwo Test",
      "daily-hours": 3,
      "total-hours": 1,
      createdAt: Date.now()
    }
  ],

  controllers: {
    index(req, res) {

      const updatedJob = Job.data.map(job => {
        const reamining = Job.services.remainingDays(job)
        const status = reamining <= 0 ? "done" : "progress"

        return {
          ...job,
          reamining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        }
      })
      return res.render("index", { jobs: updatedJob })
    },

    create(req, res) {
      return res.render("job")
    },

    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 1

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createdAt: Date.now()
      })

      return res.redirect('/')
    },

    show(req, res) {
      const id = req.params.id

      const job = Job.data.find(job => Number(job.id) == Number(id))

      if (!job) {
        return res.status(404).send("Job not found")
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

      return res.render("job-edit", { job })
    },

    update(req, res) {
      const id = req.params.id

      const job = Job.data.find(job => job.id == id)

      if (!job) {
        return res.status(404).send("Job not found")
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"]
      }

      Job.data = Job.data.map(job => {
        if (job.id == id) {
          job = updatedJob
        }

        return job
      })

      res.redirect('/job/' + id)
    }

  },

  services: {
    remainingDays(job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

      const date = new Date(job.createdAt)
      const deadLineDay = date.getDate() + Number(remainingDays)
      const deadLineDate = date.setDate(deadLineDay)

      const timeDiff = deadLineDate - Date.now()

      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = (timeDiff / dayInMs).toFixed()

      return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
}

routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)

routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)

routes.get('/profile', profileController.index)
routes.post('/profile', profileController.update)

module.exports = routes
