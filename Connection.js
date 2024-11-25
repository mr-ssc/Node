const mysql = require("mysql")
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ssc"
})

conn.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connection successfully")
    }
})


    


module.exports = conn



