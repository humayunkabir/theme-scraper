const mongoose = require("mongoose");
const schema = require("./schema");

const Theme = mongoose.model("Theme", schema.themeSchema);
const ThemeMetaData = mongoose.model(
  "ThemeMetaData",
  schema.themeMetaDataSchema
);

module.exports = {
  Theme,
  ThemeMetaData,
};
