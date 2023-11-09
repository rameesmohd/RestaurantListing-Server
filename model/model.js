const db = require('../db')

db.changeUser({database : 'restaurants'},(error)=>{
    if(error){
        console.log(error)
    }
})

const createTable = `CREATE TABLE IF NOT EXISTS restaurantTable(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    contact BIGINT NOT NULL,
    image VARCHAR(255) NOT NULL
)`;

db.query(createTable,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('table created');
    }
})

module.exports = db