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
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(cors({
    origin: 'http://localhost:5173', // You can restrict this to your React app's URL
    methods: ['GET', 'POST'], // Allow methods like GET and POST
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
  }));

  
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/file", filesRoutes);

app.listen(port, () => console.log(`The server is running on port ${port}`));
