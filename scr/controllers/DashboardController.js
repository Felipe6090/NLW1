const Job = require("../model/job");
const Utils = require("../utils/jobUtils");
const Profile = require("../model/profile");

module.exports = {
  async index(req, res) {
    const jobss = await Job.get();
    const profile = await Profile.get()


    let statusCount = {
      progress: 0,
      done: 0,
      totalJobs: jobss.length,
    };

    let jobTotalHours = 0;

    const updatedJobs = jobss.map((job) => {
      const remaining = Utils.remainingDaysCalc(job);
      const status = remaining <= 0 ? "done" : "progress";

      statusCount[status] += 1;


      jobTotalHours = status === "progress" ? jobTotalHours + job["daily-hours"] : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: Utils.calculeteBudget(job, profile.hourValue),
      };
    });

    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
