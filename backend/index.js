const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT;

const connectToDb = require("./config/connectToDb");
const userRoutes = require("./routes/userRoutes");
const filesRoutes = require("./routes/filesRoutes");
connectToDb();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/file", filesRoutes);

app.listen(port, () => console.log(`The server is running on port ${port}`));
