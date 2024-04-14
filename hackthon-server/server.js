import { pause } from "./timer.js";
import { caluclatetime } from "./timer.js";
import express from "express";
//import sql from "mysql2";
const app = express();
/*
const connection = sql.createConnection({
    host: "localhost",
    user: "nararaki",
    password: "",
    database: "",
});
*/
/*
connection.connect((error)=>{
    if(error){
        throw error;
    }else{
        console.log("conncted");
    }
});
*/
app.post("/timer",(req,res)=>{
    if(req.body.data == "start"){
        startday = new Date.now();
        console.log("hello");
    } 
    if(req.body.data == "finish"){
        finishday = new Date.now();
        let returndata = caluclatetime(startday,finishday);
        
    }
});

app.listen(3000,()=>{
    console.log("server started at 3000");
});