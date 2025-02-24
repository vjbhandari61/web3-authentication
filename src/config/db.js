const mongoose = require("mongoose");

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database Connected Successfully");
    }).catch((err) => {
        console.error("Database Connection Error: ", err)
    })
} 

module.exports = connectDb;