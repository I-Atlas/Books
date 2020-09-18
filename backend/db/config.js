const config = require("../config");
const env = process.env.NODE_ENV || "development";

module.exports = { [env]: config.db };
