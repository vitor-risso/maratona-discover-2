const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')

module.exports = {
  create(req, res) {
    return res.render("job")
  },

  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now()
    })

    return res.redirect('/')
  },

  async show(req, res) {
    const id = req.params.id
    const profile = await Profile.get()
    const jobs = await Job.get()
    const job = jobs.find(job => Number(job.id) == Number(id))

    if (!job) {
      return res.status(404).send("Job not found")
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

    return res.render("job-edit", { job })
  },

  async update(req, res) {
    const id = req.params.id
   
    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    }

    await Job.update(updatedJob, id)

    res.redirect('/job/' + id)
  },

  async delete(req, res) {
    const jobId = req.params.id

    await Job.delete(jobId)

    return res.redirect('/')
  }

}
