const mongoose = require("mongoose");

const dbString =
  "mongodb+srv://ghevinchandra042:Ghevin%4042@file-sharing.hm9vy.mongodb.net/?retryWrites=true&w=majority&appName=file-sharing";

console.log(dbString);
const connectToDb = async () => {
  try {
    await mongoose.connect(dbString);
    console.log("DB connected");
    return Promise.resolve({ error: false });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    return Promise.reject(error);
  }
};

module.exports = connectToDb;
