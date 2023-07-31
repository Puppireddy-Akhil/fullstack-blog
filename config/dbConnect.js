const mongoose = require('mongoose');
const dbconnect=async ()=>{
    try{
        console.log('db connected successfully')
    } catch(error){
        console.log('db connection failed',error.message);
    }
};
dbconnect();
//module.exports=dbconnect;