'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SeccionSchema = Schema({
    titulo: {type: String, require:true},
    contenido: {type: String},
    tituloBtn: {type: String, require:true},
    /*Analizar la posibilidad de almacenar en la bd las imagenes que contiene
    cada seccion*/
})

module.exports = mongoose.model('Seccion', SeccionSchema)
