const mongoose=require("mongoose");


exports.database=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017").then(()=> console.log("Database Connect Successfull"))
    .catch((error)=>{
        console.log("database not connected")
        process.exit(1);
    })
}