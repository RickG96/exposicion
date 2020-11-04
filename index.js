const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "192.241.135.82",
    port: "3306",
    user: "runi",
    password: "runi2k18",
    database: "runi"
});

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json("ok");
});

app.get('/getconsulta1', (req, res) => {
    const queryC1 = `
    select 
        p.nombre_profesional as "nombre",
        count(ip.cod_profesional) as "cantidad"
    from profesional_invento ip, profecional p
    where ip.cod_profesional = p.cod_profesional
    group by p.nombre_profesional
    order by count(ip.cod_profesional) desc
    `;
    con.query(queryC1, (err, result, fields) => {
        if (err) throw err;
        
        res.json(result);
     });
});

app.get('/getconsulta8', (req, res) => {
    const queryC1 = `
    select
        substring(nombre_pais, 1, 1) as "inicial",
        sum(area_km2) as "suma_area"
    from pais
    group by substring(nombre_pais, 1, 1)
    order by substring(nombre_pais, 1, 1)
    `;
    con.query(queryC1, (err, result, fields) => {
        if (err) throw err;
        
        res.json(result);
     });
});

app.get('/getconsulta9', (req, res) => {
    const queryC1 = `
    select 
    r.nombre_inventor as "inventor",
    o.nombre_invento as "invento"
from inventado i, invento o, inventor r
where i.cod_invento = o.cod_invento and i.cod_inventor = r.cod_inventor and substring(r.nombre_inventor, 1, 2) = "Be"
    `;
    con.query(queryC1, (err, result, fields) => {
        if (err) throw err;
        
        res.json(result);
     });
});

app.get('/getconsulta10', (req, res) => {
    const queryC1 = `
    select 
    r.nombre_inventor as "nombre",
    o.nombre_invento as "invento",
    o.anio_invento as "año"
from inventado i, invento o, inventor r
where i.cod_invento = o.cod_invento and i.cod_inventor = r.cod_inventor and substring(r.nombre_inventor, 1, 1) = "B" and (substring(r.nombre_inventor, -1, 1) = "r" or substring(r.nombre_inventor, -1, 2) = "n") and (year(concat(o.anio_invento, "-01-01")) between year("1800-01-01") and year("1900-01-01"))
    `;
    con.query(queryC1, (err, result, fields) => {
        if (err) throw err;
        
        res.json(result);
     });
});

app.get('/getconsulta12', (req, res) => {
    const queryC1 = `
    select
    nombre_invento
from invento
where substring(nombre_invento, 1, 1) = "L" and  char_length('nombre_invento') = 4
    `;
    con.query(queryC1, (err, result, fields) => {
        if (err) throw err;
        
        res.json(result);
     });
});

app.listen(3000, (err) => {
    if (err) console.log('Ocurrio un error'), process.exit(1);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    console.log('Escuchando en el puerto 3000');
});