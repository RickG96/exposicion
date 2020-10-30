const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "bd-proyecto2-do-user-4931420-0.a.db.ondigitalocean.com",
    port: "25060",
    user: "doadmin",
    password: "s9np5hvgbctyiq0l",
    database: "defaultdb"
});

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json("ok");
});

app.get('/getpokemon/:id?', (req, res) => {
    if(req.params.id){
        con.query("SELECT * FROM pokemon WHERE numero_pokedex = " + mysql.escape(req.params.id), (err, result, fields) => {
            if (err) throw err;
            
            res.json(result);
        });
    } else {
        con.query("SELECT * FROM pokemon", (err, result, fields) => {
            if (err) throw err;
            
            res.json(result);
         });
    }
});

app.delete('/deletepokemon/:id', (req, res) => {
    if(req.params.id){
        con.query("DELETE FROM pokemon WHERE numero_pokedex = " + mysql.escape(req.params.id), (err, result, fields) => {
            if (err) throw err;
            
            res.json("deleted!");
        });
    } else {
        res.json("error");
    }
});

app.post('/insertpokemon', (req, res) => {
    let insertSql = "INSERT INTO pokemon (numero_pokedex, nombre, avatar, tipo) VALUES ?";
    let values = [
        [req.body.numero_pokedex, req.body.nombre, req.body.avatar, req.body.tipo]
    ]
    con.query(insertSql, [values], (err, result) => {
        if (err) throw err;
        res.json('inserted!');
    });
});

app.put('/updatepokemon', (req, res) => {
    let updateSql = "UPDATE pokemon SET nombre = " + mysql.escape(req.body.nombre) + ", avatar = " + mysql.escape(req.body.avatar) + ", tipo = " + mysql.escape(req.body.tipo) + " WHERE numero_pokedex = " + mysql.escape(req.body.numero_pokedex);
    con.query(updateSql, (err, result) => {
        if(err) throw err;

        res.json("updated!");
    })
}); 

app.listen(3000, (err) => {
    if (err) console.log('Ocurrio un error'), process.exit(1);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    console.log('Escuchando en el puerto 3000');
});