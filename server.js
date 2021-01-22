const mongoose = require("mongoose");
const { Theme } = require("./models");
const today = new Date().toISOString().split("T").shift().split("-").join("/");
const themes = require(`./data/${today}.json`);

mongoose
  .connect(
    "mongodb+srv://root:N8ko8aT6YXlS@clusterthemescraper.3ustf.mongodb.net/theme-scraper-db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    Theme.insertMany(themes.data).then(console.log).catch(console.log);
  })
  .catch((error) => {
    console.log(error);
  });
