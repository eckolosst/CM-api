'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = Schema({
    email: {type: String},
    pass: {type: String},
    nombre: {type: String},
    apellido: {type: String},
    // Se agregan los datos de seguimiento como datos sueltos para ahorrar tiempo y desarrollo (verificación de atomicidad)
    // 0: origen, 1: destino
    seguimiento: []
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
