const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')

module.exports = {
  async index(req, res) {
    const profile = await Profile.get()
    const job = Job.get()
    let statusCount = {
      progress: 0,
      done: 0,
      total: job.length
    }

    let jobTotalHours = 0

    const updatedJob =  job.map(job => {
      const reamining = JobUtils.remainingDays(job)
      const status = reamining <= 0 ? "done" : "progress"

      statusCount[status] += 1

      status === "progress" ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours

      return {
        ...job,
        reamining,
        status,
        budget: JobUtils.calculateBudget(job,  profile["value-hour"])
      }
    })

    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", { jobs: updatedJob, profile: profile, statusCount: statusCount, freeHours: freeHours })
  }
}
