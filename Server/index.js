const express=require("express");
const app=express();
const cookieparser=require("cookie-parser")
const fileupload=require("express-fileupload");
const cors=require("cors")

const {database}=require("./config/database");
const {cloudinary}=require("./config/cloudinary")
const user=require("./routes/user")
const books=require("./routes/books") 
const Payment=require("./routes/Payment") 


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
app.use(express.urlencoded({ extended: true }));

app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
)

app.use("/api/v1/user",user);
app.use("/api/v1/books",books);
app.use("/api/v1/Payment",Payment);


app.listen(process.env.PORT,()=>{
    console.log('Server is starting at port no 4000' )
})

app.get("/",(req,resp)=>{{
    resp.send("Home page")
}})