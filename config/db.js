const mongoose = require("mongoose");
const config = require("config");
// Prefer environment variable first to avoid relying on checked-in config files
const db = process.env.MONGO_URI || (config.has("mongoURI") ? config.get("mongoURI") : null);

const connectDB = async () => {
  try {
    if (!db) {
      console.error("No MongoDB connection string configured. Set MONGO_URI env var or config mongoURI.");
      process.exit(1);
    }
    // mongoose v6+ uses sensible defaults; no need to pass useNewUrlParser
    await mongoose.connect(db);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection error:");
    console.error(err && err.message ? err.message : err);

    // give a clearer hint for SRV DNS failures
    if (err && err.message && err.message.includes("querySrv ENOTFOUND")) {
      console.error(
        "SRV DNS lookup failed for your cluster host. Check the hostname in config/default.json and your network/DNS/VPN."
      );
      console.error(
        "Run: nslookup -type=SRV _mongodb._tcp.<your-cluster-host>"
      );
    }

    process.exit(1);
  }
};

module.exports = connectDB;
