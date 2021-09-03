//const express = require('express');
import express, { Router } from 'express';
import db from './config/db.js';
import router from './routes/index.js';


const app = express();

//Conectar la base de datos
db.authenticate() 
    .then( () => console.log('Base de datos Conectada'))
    .catch( error => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;




// Obtener el año actual
app.use ( (req, res, next) => { 
    res.locals.nombreSitio = 'Agencia de Viaje';
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    next();
    
});

//Habilitar pug
app.set('view engine', 'pug');


// Definir la carpeta publica
app.use(express.static('Publica'));

// Agregar body Parse
app.use(express.urlencoded({extended: true}));

// Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})

// Uno de los aspectos mas importantes es que el router este antes del listen. Antes del router puede ir cualquier tipo de información que se aplique a la pagina.

