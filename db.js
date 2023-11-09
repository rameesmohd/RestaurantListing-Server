const mySql = require('mysql2')

const db = mySql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456'
})

db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Connected');
    }
})

db.query('CREATE DATABASE IF NOT EXISTS restaurants',(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Database created');
    }
})

module.exports = db

