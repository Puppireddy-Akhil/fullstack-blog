const mongoose = require('mongoose');
const dbconnect=async ()=>{
    try{
        console.log('db connected successfully')
    } catch(error){
        console.log('db connection failed, cannot connect to mongodb',error.message);
    }
};
dbconnect();
//module.exports=dbconnect;