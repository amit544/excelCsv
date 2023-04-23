const express=require("express");
const app=express();
const userRouter = require("./routes/user.route");
app.use(userRouter);

app.listen(3000,()=>{
    console.log("server is listen on ",3000);
})
