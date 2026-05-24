const dns = require("node:dns");

dns.setServers(["1.1.1.1"]);

const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("-----------------------------------------");
        console.log("✅ MongoDB Connected Successfully");
        console.log(`🌍 HOST     : ${conn.connection.host}`);
        console.log(`📦 DATABASE : ${conn.connection.name}`);
        console.log("-----------------------------------------");
    } catch (error) {
        console.log("-----------------------------------------");
        console.log("❌ MongoDB Connection Failed");
        console.log(error.message);
        console.log("-----------------------------------------");

        process.exit(1);
    }
};

module.exports = connectDB;