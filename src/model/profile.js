let data = {
  name: "Vitor Hugo",
  avatar: "https://github.com/vitor-risso.png",
  "vacation-per-year": 1,
  "days-per-week": 5,
  "hours-per-day": 8,
  "monthly-budget": 3000,
  "value-hour": 75
}

module.exports = {
  get() {
    return data
  },

  update(newData) {
    return data = newData
  }
}
