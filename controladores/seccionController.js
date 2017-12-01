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
//api/seccion
function getSecciones (req, res) {
    Seccion.find({}, (err, array) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!array) return res.status(404).send({message: 'No existen secciones'})
        res.status(200).send({secciones: array})
    }).sort('orden')
}
//api/titulos
function getTitulos (req, res){
    Seccion.find({}, (err, array) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!array) return res.status(404).send({message: 'No existen secciones'})
        res.status(200).send({titulos: array})
    }).select({tituloBtn: 1, _id:1}).sort('orden')
}

function saveSeccion(req, res){
    let seccion = new Seccion()
    seccion.titulo = req.body.titulo
    seccion.contenido = req.body.contenido
    seccion.tituloBtn = req.body.tituloBtn
    seccion.orden = req.body.orden
    seccion.save((err, eltoStored) => {
        if(err) res.status(500).send({message: 'Error al guardar la seccion' + seccion.titulo})
        res.status(200).send({seccion: eltoStored})
    })
}

function updateSeccion (req, res) {
    let seccionId = req.params.seccionId
    let update = req.body
    Seccion.findByIdAndUpdate(seccionId, update, (err, eltoUpdated) => {
        if(err) {
            res.status(500).send({message: `Error al actualizar la seccion: ${err}`})
        }
        else{
            if(!eltoUpdated){
                res.status(404).send({message:"No se han enviado los datos"})
            }
            else{
                res.status(200).send({seccion: eltoUpdated})
            }
        }
    })
}

function deleteSeccion (req, res) {
    let seccionId = req.params.seccionId
    Seccion.findByIdAndRemove(seccionId, (err, elto) => {
        if(err){
             res.status(500).send({message: `Error al borrar la seccion: ${err}`})
        }
        else{
            if(!elto){
                res.status(404).send({message: "Error en la Petición"})
            }
            else{
                res.status(200).send({seccion: elto});
            }
        }
    })
}


module.exports = {
    getSeccion,
    getSecciones,
    getTitulos,
    saveSeccion,
    updateSeccion,
    deleteSeccion
}
