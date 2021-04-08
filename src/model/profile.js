const dataBase = require('../db/config')

module.exports = {
  async get() {
    const db = await dataBase()

    const data = await db.get(`SELECT * FROM profile`)
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

  async update(newData) {
    const db = await dataBase()
    db.run(` UPDATE profile SET 
      name = "${newData.name}",
      avata = "${newData.avatar}",
      monthly_budget = ${newData[monthly-budget]},
      days_per_week = ${newData[days-per-week]},
      hours_per_day = ${newData[hours-per-day]}, 
      vacation_per_year = ${newData[vacation-per-year]} ,
      value_hour = ${newData[value-hour]}      
    `)
    await db.close()

  }
}
