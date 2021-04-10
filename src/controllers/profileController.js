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

    if (req.body["vacation-per-year"] > 52) {
      return res.status(400).send({meesage: "Período de férias deve ser menor que 52 semanas"}).redirect('/profile')
    }

    try {
      await Profile.update({
        ...profile,
        ...req.body,
        "value-hour": valueHour
      })
    } catch (error) {
      return res.status(500).send({ messgae: "Erro na hora de salvar no banco de dados. Internal server error" }).redirect('/profile')
    }

    return res.status(200).redirect('/profile')
  },
}
