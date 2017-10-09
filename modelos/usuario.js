'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = Schema({
    email: {type: String, require:true},
    pass: {type: String, require:true},
    nombre: {type: String},
    apellido: {type: String}
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
