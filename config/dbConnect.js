const mongoose = require('mongoose');
const dbconnect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('db connected successfully')
    } catch(error){
        console.log('db connection failed, cannot connect to mongodb',error.message);
    }
};
dbconnect();
//module.exports=dbconnect;