const express = require("express")
const routes = express.Router()

const basePath = __dirname + "/views/"

const Profile = {
  data: {
    name: "Vitor Hugo",
    avatar: "https://github.com/vitor-risso.png",
    "vacation-per-year": 1,
    "days-per-week": 5,
    "hours-per-day": 8,
    "monthly-budget": 3000,
    "value-hour": 75
  },

  controllers: {
    index(req, res) {
      return res.render(basePath + "profile", { profile: Profile.data })
    },

    update(req, res) {
      const data = req.body
      const weekPerYear = 52
      const weekPerMonth = (weekPerYear - data["vacation-per-year"]) / 12
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
      const monthlyTotalHours = weekTotalHours * weekPerMonth

      const valueHour = data["monthly-budget"] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour
      }

      return res.redirect('/profile')
    },
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
          budget: Profile.data["value-hour"] * job["total-hours"]
        }
      })
      return res.render(basePath + "index", { jobs: updatedJob })
    },

    create(req, res) {
      return res.render(basePath + "job")
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


      return res.render(basePath + "job-edit", { job })
    },

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
  }
}

routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)

routes.get('/job/:id', Job.controllers.show)

routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes
