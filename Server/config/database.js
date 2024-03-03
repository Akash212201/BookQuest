const mongoose=require("mongoose");


exports.database=()=>{
    mongoose.connect(process.env.URL).then(()=> console.log("Database Connect Successfull"))
    .catch((error)=>{
        console.log("database not connected")
        process.exit(1);
    })
}