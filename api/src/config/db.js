import mysql from "mysql2"

const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "EPMS2"
})

export default db;

db.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database");
})  