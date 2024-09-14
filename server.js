const express=require("express");
const errorhandler = require("./middleware/errorhandler");
const connectdb = require("./config/dbConnection");
const dotenv=require("dotenv").config();
const app=express();

const port=process.env.PORT;
connectdb();

app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorhandler);

app.listen(port,()=>{
    console.log(`Server is started ${port}`);
})