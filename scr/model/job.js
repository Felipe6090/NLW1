const Database = require("../db/config");

let data = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    createdAt: Date.now(),
    budget: 4500,
  },
  {
    id: 2,
    name: "One Two Project",
    "daily-hours": 1,
    "total-hours": 1,
    createdAt: Date.now(),
    budget: 4500,
  },
];

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.all(`SELECT * FROM jobs`);

    await db.close();

    return data.map((job) => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.dailyHours,
      "total-hours": job.totalHours,
      createdAt: job.createdAt,
    }));
  },
  async update(updatedJob, id) {
    const db = await Database();

    await db.run(
      `UPDATE jobs SET
      name = "${updatedJob.name}",
      dailyHours = ${updatedJob["daily-hours"]},
      totalHours = ${updatedJob["total-hours"]}
      WHERE id = ${id}` 
    );

    await db.close();
  },
  async delete(id) {
    const db = await Database();

    await db.run(`DELETE FROM jobs WHERE id = ${id}`);

    await db.close();
  },
  async create(newJob) {
    const db = await Database();

    await db.run(`INSERT INTO jobs (
      name,
      dailyHours,
      totalHours,
      createdAt
    ) VALUES (
      "${newJob.name}",
      ${newJob["daily-hours"]},
      ${newJob["total-hours"]},
      ${newJob.createdAt}
    )`);

    await db.close();
  },
};
