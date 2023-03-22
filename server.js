// Import Modul
const express = require("express");
const mysql = require("mysql")
const BodyParser = require("body-parser");
// Inisialisasi Aplikasi
const app = express();
app.use(BodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.set("views", "views")

// Connection To Database
const db = mysql.createConnection({
    host : "localhost",
    database: "school",
    user : "root",
    password : "" ,

})

// Connect
db.connect((err) => {
    if (err) throw err
    console.log("database connected...");

    // Route Handling & Get Data
    app.get("/", (req, res) => {
        // Get Data From Database
        const sql = "SELECT * FROM user";
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result));
            res.render("index", { users:users, titleDocument : "CRUD NODE.JS", titleTable : "DATA SISWA" })
        });
    });

    // Inser Data
    app.post("/tambah", (req, res,) => {
        const insertSql = `INSERT INTO user (nama, kelas) VALUES('${req.body.nama}', '${req.body.kelas}');`;
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/");
        })
    });
})

// Check Port
app.listen(8000, () => {
    console.log("server ready...")
});
