const mongoose = require("mongoose");
const { Schema } = mongoose;

const themeSchema = new Schema({
  themeId: String,
  title: String,
  updatedAt: String,
});

const themeMetaDataSchema = new Schema({
  themeId: String,
  rank: Number,
  purchases: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  themeSchema,
  themeMetaDataSchema,
};
