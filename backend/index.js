const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const port = process.env.PORT;

const connectToDb = require("./config/connectToDb");
const userRoutes = require("./routes/userRoutes");
const filesRoutes = require("./routes/filesRoutes");
connectToDb();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 500000,
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.text());
app.use(cookieParser());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/file", filesRoutes);

app.listen(port, () => console.log(`The server is running on port ${port}`));
