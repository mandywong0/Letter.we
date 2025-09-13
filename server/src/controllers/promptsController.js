const prompts = require("../data/prompts");

const getDailyPrompt = (req, res) => {

  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today - startOfYear + (startOfYear.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
  const oneDayinMS = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDayinMS);

  const index = dayOfYear % prompts.length;
  const prompt = prompts[index];

  res.json({ prompt });
  
};

module.exports = { getDailyPrompt };
