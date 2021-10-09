const Profile = require("../model/profile")

module.exports = {
  async index(req, res) {
    const profile = await Profile.get();

    return res.render("profile", { profile: profile });
  },
  async update(req, res) {
    const profile = await Profile.get();

    const data = req.body;
    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    const monthlyTotalHours = weeksPerMonth * weekTotalHours;

    const hourValueUpdated = data["monthly-budget"] / monthlyTotalHours;

    await Profile.update({
      ...profile,
      ...req.body,
      hourValue: hourValueUpdated,
    });

    return res.redirect("/profile");
  },
};
