const Database = require('./config')

const start = {
  async init() {
    const db = await Database()

    await db.exec(`CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT
    )`)

    await db.exec(`CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      dayli_hours INT,
      total_hours INT,
      created_at DATETIME
    )`)

    await db.run(`INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour
    ) VALUES (
      "Vitor Hugo",
      "https://github.com/vitor-risso.png",
      3000,
      8,
      5,
      1,
      75
    );`)

    await db.run(`INSERT INTO jobs (
      name,
      dayli_hours,
      total_hours,
      created_at
    ) VALUES (
      "Nubank",
      2,
      600,
      1617514376018
    );`)

    await db.run(`INSERT INTO jobs (
      name,
      dayli_hours,
      total_hours,
      created_at
    ) VALUES (
      "Andoird app",
      3,
      1,
      1617514376018
    );`)

    await db.close()
  }
}

start.init()
