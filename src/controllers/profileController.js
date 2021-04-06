module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.data })
  },

  update(req, res) {
    const data = req.body
    const weekPerYear = 52
    const weekPerMonth = (weekPerYear - data["vacation-per-year"]) / 12
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
    const monthlyTotalHours = weekTotalHours * weekPerMonth

    const valueHour = data["monthly-budget"] / monthlyTotalHours

    Profile.data = {
      ...Profile.data,
      ...req.body,
      "value-hour": valueHour
    }

    return res.redirect('/profile')
  },
}
