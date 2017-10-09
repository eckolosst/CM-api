'use strict'

// librería para gestionar base de datos mongodb
const mongoose = require('mongoose')
const app = require('./app')
// define al puerto como variable de entorno o por defecto
const port = process.env.PORT || 3002

// mongoose.connect('mongodb://username:password@host:port/database?options...');
mongoose.connect('mongodb://localhost:27017/gallery', (err, res) => {
  if(err){
    return console.log(`Error al conectar la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida con éxito')

  // se puede escribir function () ó () =>
  app.listen(port, () =>{
    // como se incluye un template de string se usa el acento inverso en vez de comillas
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
