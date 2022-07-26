const mongoose = require("mongoose");

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("Database connected!");
});

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = { dbConnect };
