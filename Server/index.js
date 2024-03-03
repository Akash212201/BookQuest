const express=require("express");
const app=express();
const cookieparser=require("cookie-parser")
const fileupload=require("express-fileupload");
const cors=require("cors")

const {database}=require("./config/database");
const {cloudinary}=require("./config/cloudinary")
const user=require("./routes/user")
const books=require("./routes/books")


database();
cloudinary();


app.use(express.json())
app.use(cookieparser())
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)

app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:"./public/temp"
    })
)

app.use("/api/v1/user",user);
app.use("/api/v1/books",books);


app.listen(process.env.PORT,()=>{
    console.log(`Server is starting at port no ${process.env.PORT}` )
})

app.get("/",(req,resp)=>{{
    resp.send("Home page")
}})