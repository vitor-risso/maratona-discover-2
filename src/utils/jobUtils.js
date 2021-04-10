module.exports =  {
  remainingDays(job) {
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    const date = new Date(job.createdAt)
    const deadLineDay = date.getDate() + Number(remainingDays)
    const deadLineDate = date.setDate(deadLineDay)

    const timeDiff = deadLineDate - Date.now()

    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.ceil(timeDiff / dayInMs)

    return dayDiff
  },

  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}
