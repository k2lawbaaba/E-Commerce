const  express = require("express");
const routes = require("./Routers/routes")
const connectMongoose = require('./Models/connect')
require('dotenv').config();
const cookieParser= require('cookie-parser');



const app = express();
// middlewares
app.use(cookieParser())
app.use(express.json());
app.use(routes);

const url=process.env.COMPASS || process.env.DATABASE;

app.listen(2000, async ()=>{
    await connectMongoose(url)
    console.log("server is running on port 2000")
})