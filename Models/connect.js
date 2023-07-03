const mongoose =require('mongoose');

const connectMongoose=(url)=>{
return mongoose.connect(url)
.then(() => console.log("Connected to database"));
}
module.exports=connectMongoose;