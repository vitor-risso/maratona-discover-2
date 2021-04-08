const Profile = require('../model/profile')
module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() })
  },

  async update(req, res) {
    const profile = await Profile.get()
    const data = req.body
    const weekPerYear = 52
    const weekPerMonth = (weekPerYear - data["vacation-per-year"]) / 12
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
    const monthlyTotalHours = weekTotalHours * weekPerMonth

    const valueHour = data["monthly-budget"] / monthlyTotalHours

    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour
    })

    return res.redirect('/profile')
  },
}
