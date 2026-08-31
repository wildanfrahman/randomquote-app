const redis = require("redis");
const { RD_HOST, RD_PORT, RD_URL } = process.env;

const clientOptions = RD_URL
  ? {
      url: RD_URL,
      ...(RD_URL.startsWith("rediss://") && {
        socket: {
          tls: true,
          rejectUnauthorized: false,
        },
      }),
    }
  : {
      socket: {
        host: RD_HOST,
        port: RD_PORT,
      },
    };

const client = redis.createClient(clientOptions);

client.on("error", (err) => {
  console.log("Redis error:", err);
});

client.on("connect", () => {
  console.log("redis connected successfully!");
});

async function ensureConnected() {
  if (!client.isOpen) {
    await client.connect();
  }
}

module.exports = { client, ensureConnected };
