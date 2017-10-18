'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SeccionSchema = Schema({
    titulo: {type: String, require:true},
    contenido: {type: String},
    tituloBtn: {type: String, require:true, index:true, unique:true}
})

module.exports = mongoose.model('Seccion', SeccionSchema)
