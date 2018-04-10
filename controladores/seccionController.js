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
//api/secciones
function getSecciones (req, res) {

    Seccion.find({}, (err, array) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!array) return res.status(404).send({message: 'No existen secciones'})
        else{
          // PETICION DESDE LA WEB
          if(req.params.fecha=="web"){
            res.status(200).send({secciones: array})
          }
          // PETICION DESDE LA APP
          else{
            // fecha: ultima modificación en la app
            let fecha = new Date(req.params.fecha.toString())
            // Verifica si alguna de las secciones se modifico
            let actualizar = array.find(function(value, index) {
              let fecha_mod = new Date(value.fecha_mod)
              let comparacion = fecha.getFullYear() <= fecha_mod.getFullYear() &&
                                fecha.getMonth() <= fecha_mod.getMonth() &&
                                fecha.getDate() <= fecha_mod.getDate() &&
                                fecha.getHours() <= fecha_mod.getHours() &&
                                fecha.getMinutes() <= fecha_mod.getMinutes()
              return comparacion
            })
            if(actualizar)
              {
                console.log("actualizó")
                res.status(200).send({secciones: array, fecha_mod: new Date().toString()})
              }
            else{
              console.log("no actualizó")
                res.status(200).send({secciones: []})
            }
          }
        }
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
  console.log(req.body)
    let seccion = new Seccion()
    seccion.titulo = req.body.titulo
    seccion.contenido = req.body.contenido
    seccion.tituloBtn = req.body.tituloBtn
    seccion.orden = req.body.orden
    seccion.fecha_mod = req.body.fecha_mod
    seccion.user_mod = req.body.user_mod
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
