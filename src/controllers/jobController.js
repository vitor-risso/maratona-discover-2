const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')

module.exports = {
  index(req, res) {
    const updatedJob = Job.get().map(job => {
      const reamining = JobUtils.remainingDays(job)
      const status = reamining <= 0 ? "done" : "progress"

      return {
        ...job,
        reamining,
        status,
        budget: JobUtils.calculateBudget(job, Profile.get()["value-hour"])
      }
    })
    return res.render("index", { jobs: updatedJob })
  },

  create(req, res) {
    return res.render("job")
  },

  save(req, res) {
    const lastId = Job.get()[Job.get().length - 1]?.id || 1

    Job.get().push({
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

    const job = Job.get().find(job => Number(job.id) == Number(id))

    if (!job) {
      return res.status(404).send("Job not found")
    }

    job.budget = JobUtils.calculateBudget(job, Profile.get()["value-hour"])

    return res.render("job-edit", { job })
  },

  update(req, res) {
    const id = req.params.id

    const job = Job.get().find(job => job.id == id)

    if (!job) {
      return res.status(404).send("Job not found")
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    }

    const newJob = Job.get().map(job => {
      if (job.id == id) {
        job = updatedJob
      }

      return job
    })

    Job.update(newJob)

    res.redirect('/job/' + id)
  },

  delete(req, res) {
    const jobId = req.params.id

    Job.delete(jobId)

    return res.redirect('/')
  }

}
