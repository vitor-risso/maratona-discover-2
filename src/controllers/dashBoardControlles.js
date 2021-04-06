const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')

module.exports = {
  index(req, res) {

    let statusCount = {
      progress: 0,
      done: 0,
      total: Job.get().length
    }

    let jobTotalHours = 0

    const updatedJob = Job.get().map(job => {
      const reamining = JobUtils.remainingDays(job)
      const status = reamining <= 0 ? "done" : "progress"

      statusCount[status] += 1

      status === "progress" ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours

      return {
        ...job,
        reamining,
        status,
        budget: JobUtils.calculateBudget(job, Profile.get()["value-hour"])
      }
    })

    const freeHours = Profile.get()["hours-per-day"] - jobTotalHours;

    return res.render("index", { jobs: updatedJob, profile: Profile.get(), statusCount: statusCount, freeHours: freeHours })
  }
}
