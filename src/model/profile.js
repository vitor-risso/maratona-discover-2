const dataBase = require('../db/config')

module.exports = {
  async get() {
    const db = await dataBase()

    const data = await db.get(`SELECT * FROM profile`)
    console.log(data)
    await db.close()    

    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "vacation-per-year": data.vacation_per_year,
      "value-hour": data.value_hour,
      "days-per-week": data.days_per_week,
      "hours-per-day": data.hours_per_day
    }
  },

  update(newData) {
    return data = newData
  }
}
