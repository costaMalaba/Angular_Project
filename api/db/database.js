import mysql from "mysql";
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
});

con.connect(error => {
    if(error){
        console.log("Not Connected");
    }
    else{
        console.log("Connected!!");
    }
});

export default con;
