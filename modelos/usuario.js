'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = Schema({
    email: {type: String, require:true},
    pass: {type: String, require:true},
    nombre: {type: String},
    apellido: {type: String},
    // Se agregan los datos de seguimiento como un documento embebido para ahorrar tiempo y desarrollo (verificación de atomicidad)
    seguimiento: {
      origen: {type: Schema.Types.Mixed},
      destino: {type: Schema.Types.Mixed},
      camino: []
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
