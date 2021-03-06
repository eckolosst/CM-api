'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CambioSchema = Schema({
    usuario: {type: Schema.ObjectId, ref: 'Usuario', require:true},
    seccion: {type: Schema.ObjectId, ref: 'Seccion', require:true},
    fecha: {type: Date, require:true}
})

module.exports = mongoose.model('Cambio', CambioSchema)
