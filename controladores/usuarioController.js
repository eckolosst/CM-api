'use strict'

const Usuario = require('../modelos/usuario')

function getUsuario (req, res) {
    let usuarioId = req.params.usuarioId
    Usuario.findById(usuarioId, (err, elto) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!elto) return res.status(404).send({message: 'El usuario no existe'})
        res.status(200).send({usuario: elto})
    })
}

function getUsuarios (req, res) {
    Usuario.find({}, (err, array) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!array) return res.status(404).send({message: 'No existen usuarios'})
        res.status(200).send({usuarios: array})
    })
}

function login (req, res){
    Usuario.find({}, (err,arra) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!array) return res.status(404).send({message: 'No existen usuarios'})
        res.status(200).send({pass: elto})
    }).select({pass: 1})
}

function saveUsuario(req, res){
    let usuario = new Usuario()
    console.log(req.body);
    usuario.nombre = req.body.nombre
    usuario.apellido = req.body.apellido
    usuario.email = req.body.email
    usuario.pass = req.body.pass
    usuario.save((err, eltoStored) => {
        if(err) res.status(500).send({message: 'Error al guardar el usuario' + usuario.nombre + ' ' + usuario.apellido})
        res.status(200).send({usuario: eltoStored})
    })
}

function updateUsuario (req, res) {
    let usuarioId = req.params.usuarioId
    let update = req.body
    Usuario.findByIdAndUpdate(usuarioId, update, (err, eltoUpdated) => {
        if(err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})
        res.status(200).send({usuario: eltoUpdated})
    })
}

function deleteUsuario (req, res) {
    let usuarioId = req.params.usuarioId
    Usuario.findById(usuarioId, (err, elto) => {
        if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
        elto.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
            res.status(200).send({message: 'El usuario fue borrada con éxito'})
        })
    })
}

module.exports = {
    getUsuario,
    getUsuarios,
    saveUsuario,
    updateUsuario,
    deleteUsuario
}
