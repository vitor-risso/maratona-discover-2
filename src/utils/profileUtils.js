module.exports = {
  valueHour(data) {

    const weekPerYear = 52
    const weekPerMonth = (weekPerYear - data["vacation-per-year"]) / 12
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
    const monthlyTotalHours = weekTotalHours * weekPerMonth
    const valueHour = data["monthly-budget"] / monthlyTotalHours

    return valueHour
  },

  validateVacations(vacation){
    if (vacation > 52) {
      return true
    }
    else false
  },

  validateDaysPerWeek(days){
    if(days > 7){
      return true
    }
    else return false
  }
}
