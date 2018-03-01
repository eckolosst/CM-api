'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = Schema({
    email: {type: String, require: true},
    pass: {type: String, require: true},
    nombre: {type: String},
    apellido: {type: String},
    // Se agregan los datos de seguimiento como datos sueltos para ahorrar tiempo y desarrollo (verificación de atomicidad)
    origenLat: { type: Number},
    origenLng: { type: Number},
    destinoLat: { type: Number},
    destinoLng: { type: Number},
    camino: []
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
