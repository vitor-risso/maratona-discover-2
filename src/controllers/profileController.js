const Profile = require('../model/profile')
const profileUtils = require('../utils/profileUtils')
module.exports = {
  async index(req, res) {
    try {
      const profile = await Profile.get()
      return res.status(200).render("profile", { profile: profile }).status(200)
    } catch (error) {
      return res.status(500).send({ message: "Erro ao buscar dados do backend" })
    }
  },

  async update(req, res) {
    const profile = await Profile.get()

    const data = req.body

    if (!data) {
      return res.status(400).redirect('/')
    }

    const valueHour = profileUtils.valueHour(data)

    if (profileUtils.validateVacations(data["vacation-per-year"])) {
      return res.status(400).send({ message: "Período de férias deve ser menor que 52 semanas" }).redirect('/profile')
    }

    if (profileUtils.validateDaysPerWeek(data["days-per-week"])) {
      return res.status(400).send({ message: "Os dias trabalhados durante a semana devem ser menores ou igual a 7" }).redirect('/profile')
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
  }
}
