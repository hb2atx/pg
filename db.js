/** Database setup for BizTime. */
const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///BizTime_test";
} else {
  DB_URI = "postgresql:///BizTime";
}

const client = new Client({
  host: "/var/run/postgresql/",
  database: "BizTime",
})

client.connect();

module.exports = client;






