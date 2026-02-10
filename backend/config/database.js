const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    const uri = process.env.MONGODB_URL;
    const options = {
        serverSelectionTimeoutMS: 20000,
        connectTimeoutMS: 20000,
        family: 4 // Force IPv4, helps with some DNS issues
    };
    mongoose.connect(uri, options)
        .then(() => { console.log("DataBase is connected Successfully") })
        .catch((err) => {
            console.log("db connection issue");
            console.error(err);
            process.exit(1);
        });
}