const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(
      `CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    avatar TEXT, 
    monthlyBudget INT, 
    daysPerWeek INT, 
    hoursPerDay INT, 
    vacationPerYear INT, 
    hourValue INT
)`
    );

    await db.exec(
      `CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    dailyHours INT,
    totalHours INT,
    createdAt DATETIME
    )`
    );

    await db.run(`
    INSERT INTO profile(
        name,
        avatar,
        monthlyBudget,
        daysPerWeek,
        hoursPerDay,
        vacationPerYear,
        hourValue
    ) VALUES (
        "Felipe",
        "https://avatars.githubusercontent.com/u/49456203?v=4",
        1500,
        5,
        9,
        4,
        75
    );
`);

    await db.run(`
        INSERT INTO jobs(
            name,
            dailyHours,
            totalHours,
            createdAt
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        )
`);

    await db.run(`
        INSERT INTO jobs(
            name,
            dailyHours,
            totalHours,
            createdAt
        ) VALUES (
            "One Two Project",
            4,
            2,
            1617514376018
        )
`);

    await db.close();
  },
};

initDb.init()