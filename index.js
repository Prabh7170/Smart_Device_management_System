const express = require("express");
const app =express();

require('dotenv').config();
const PORT=process.env.PORT||4000;

app.use(express.json());
require("./config/database").connect();

const user =require("./routes/user");
app.use("/auth",user);

const deviceRoutes = require("./routes/devices");
app.use("/devices",deviceRoutes);


app.listen(PORT,()=>{
    console.log(`app is listening at ${PORT}`);
})