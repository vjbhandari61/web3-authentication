require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./src/config/db")
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api", routes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Listening On Port ${PORT}`);
})