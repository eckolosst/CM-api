'use strict'

const Seccion = require('../modelos/seccion')

function getSeccion (req, res) {
    let seccionId = req.params.seccionId
    Seccion.findById(seccionId, (err, elto) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!elto) return res.status(404).send({message: 'La seccion no existe'})
        res.status(200).send({seccion: elto})
    })
}

function getSecciones (req, res) {
    Seccion.find({}, (err, array) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!array) return res.status(404).send({message: 'No existen secciones'})
        res.status(200).send({secciones: array})
    })
}

function saveSeccion(req, res){
    let seccion = new Seccion()
    seccion.titulo = req.body.titulo
    seccion.contenido = req.body.contenido
    seccion.tituloBtn = req.body.tituloBtn
    seccion.save((err, eltoStored) => {
        if(err) res.status(500).send({message: 'Error al guardar la seccion' + seccion.titulo})
        res.status(200).send({seccion: eltoStored})
    })
}

/*Xq a veces es req.params y a veces req. body???*/

function updateSeccion (req, res) {
    let seccionId = req.params.seccionId
    let update = req.body
    Seccion.findByIdAndUpdate(seccionId, update, (err, eltoUpdated) => {
        if(err) res.status(500).send({message: `Error al actualizar la seccion: ${err}`})
        res.status(200).send({seccion: eltoUpdated})
    })
}

function deleteSeccion (req, res) {
    let seccionId = req.params.seccionId
    Seccion.findById(seccionId, (err, elto) => {
        if(err) res.status(500).send({message: `Error al borrar la seccion: ${err}`})
        elto.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar la seccion: ${err}`})
            res.status(200).send({message: 'La seccion fue borrada con éxito'})
        })
    })
}

module.exports = {
    getSeccion,
    getSecciones,
    saveSeccion,
    updateSeccion,
    deleteSeccion
}
