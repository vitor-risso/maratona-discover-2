const dataBase = require('../db/config')

module.exports = {
  async get() {
    const db = await dataBase()

    const data = await db.all(`SELECT * FROM jobs`)


    await db.close()
    return data.map(job => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      createdAt: job.created_at
    }))
  },

  async update(newJob) {
    const db = await dataBase()

    await db.run(`UPDATE jobs SET 
      name = "${newJob.name},
      daily_hours = ${newJob["total-hours"]},
      total_hours = "${newJob["daily-hours"]},
      created_at = ${newJob.createdAt}
      WHERE id = ${newJob.id}
    `)

    await db.close()
  },

  async delete(id) {
    const db = await dataBase()

    await db.run(`DELETE FROM jobs WHERE id = ${id}`)

    await db.close()
  },

  async create(newJob) {
    const db = await dataBase()

    await db.run(`INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES(
      "${newJob.name}",
      ${newJob["daily-hours"]},
      ${newJob["total-hours"]},
      ${newJob.createdAt}
    )`)

    await db.close()
  }
}
