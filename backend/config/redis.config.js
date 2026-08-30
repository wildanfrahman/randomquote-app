const redis = require("redis");
const { RD_HOST, RD_PORT } = process.env;

const client = redis.createClient({
  host: RD_HOST,
  port: RD_PORT,
});

client.on("error", (err) => {
  console.log("Redis error:", err);
});

client.connect();

module.exports = client;
