const mongoose = require("mongoose");
const dbaddress="mongodb://localhost:27017/makeupstore";


const connectDB = async () => {
 try {
 const connect = await mongoose.connect(dbaddress);
console.log("monogDB connected successfully");
} catch (error) {
 console.log(error);
}
};
module.exports = connectDB;