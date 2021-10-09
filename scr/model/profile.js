const Database = require("../db/config");

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.get(`SELECT * FROM profile`);

    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthlyBudget,
      "days-per-week": data.daysPerWeek,
      "hours-per-day": data.hoursPerDay,
      "vacation-per-year": data.vacationPerYear,
      hourValue: data.hourValue,
    };
  },
  async update(newData) {
    const db = await Database();

    db.run(`
    UPDATE profile SET
    name = "${newData.name}",
    avatar = "${newData.avatar}",
    monthlyBudget = ${newData["monthly-budget"]},
    daysPerWeek = ${newData["days-per-week"]},
    hoursPerDay = ${newData["hours-per-day"]},
    vacationPerYear = ${newData["vacation-per-year"]},
    hourValue = ${newData.hourValue}
    `);

    await db.close();
  },
};
