const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')

module.exports = {
  create(req, res) {
    return res.render("job")
  },

  async save(req, res) {

    try {

      await Job.create({
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createdAt: Date.now()
      })

    } catch (error) {

      return res.status(500).redirect('/')

    }

    return res.status(201).redirect('/')
  },

  async show(req, res) {

    try {
      const id = req.params.id
      const profile = await Profile.get()
      const jobs = await Job.get()
      const job = jobs.find(job => Number(job.id) == Number(id))
      if (!job) {
        return res.status(404).send("Job not found")
      }

      job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

      return res.status(200).render("job-edit", { job })
    } catch (error) {
      return res.status(404).redirect('/')
    }
  },

  async update(req, res) {
    try {

      const id = req.params.id

      const updatedJob = {
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"]
      }

      await Job.update(updatedJob, id)
      res.status(200).redirect('/job/' + id)

    } catch (error) {
      return res.status(400).redirect('/job/' + id)
    }

  },

  async delete(req, res) {

    try {
      const jobId = req.params.id

      await Job.delete(jobId)
      return res.status(200).redirect('/')

    } catch (error) {
      return res.status(400).redirect('/job/' + id)
    }

  }

}
