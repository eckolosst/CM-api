'use strict'

// librería para gestionar base de datos mongodb
const mongoose = require('mongoose')
const app = require('./app')
// define al puerto como variable de entorno o por defecto
const port = process.env.PORT || 3002

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cmdb',{useMongoClient: true})
        .then(() => {
            console.log('+------------------------------------------------------------+')
            console.log('|  Conexión a la base de datos "cmdb" establecida con éxito  |')
            app.listen(port, () =>{
                console.log(`|        CM-api corriendo en http://localhost:${port}           |`)
                console.log('+------------------------------------------------------------+')
            })
        })
        .catch(err => console.log(err));
