let data = [
  {
    id: 1,
    name: "Nubank",
    "daily-hours": 2,
    "total-hours": 600,
    createdAt: Date.now()
  },
  {
    id: 2,
    name: "App android",
    "daily-hours": 3,
    "total-hours": 1,
    createdAt: Date.now()
  }
]

module.exports = {
  get() {
    return data
  },

  update(newJob) {
    data = newJob
  },

  delete(id){
    data = data.filter(job => Number(job.id) !== Number(id))
  },

  create(newJob){
    data.push(newJob)
  }
}
