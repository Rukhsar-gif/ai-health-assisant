const cron = require("node-cron");
const Vaccine = require("../models/Vaccination");

const startReminderService = () => {

  // runs every day at 9 AM
  cron.schedule("0 9 * * *", async () => {
    console.log("Checking vaccination reminders...");

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    try {
      const vaccines = await Vaccine.find({
        nextDoseDate: { $lte: tomorrow }
      });

      vaccines.forEach(v => {
        console.log(`Reminder: ${v.vaccineName} due for ${v.childName}`);
      });

    } catch (error) {
      console.log(error);
    }
  });

};

module.exports = startReminderService;