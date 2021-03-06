'use strict'

var bcrypt = require('bcrypt-nodejs');//si causa error cambiar bcrypt-nodejs por bcrypt

const Usuario = require('../modelos/usuario')

var jwt = require('../services/jwt')

function getUsuario (req, res) {
    let usuarioId = req.params.usuarioId
    Usuario.findById(usuarioId, (err, elto) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!elto) return res.status(404).send({message: 'El usuario no existe'})
        res.status(200).send({usuario: elto})
    })
}

// Solo se utiliza desde la WEB!!!!
function getUsuarios (req, res) {
    let arreglo = ['admin@email.com', 'app-client@email.com'];
    Usuario.find({email: {$nin: arreglo},rol:"admin"}, (err, array) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!array) return res.status(404).send({message: 'No existen usuarios'})
        res.status(200).send({usuarios: array})
    }).select({nombre:1, apellido:1, email:1})
}

function login (req, res){
    var type = req.params.type
    var params = req.body
    var email = params.email
    var pass = params.pass
    Usuario.findOne({email: email.toLowerCase()}, (err, userFind) => {
        if(err) {res.status(500).send({message: 'Error al comprobar el usuario'})}
        else{
            if(userFind){
                if(type == "web" && userFind.rol == 'user'){
                  res.status(505).send({message:'El usuario no ha podido loguearse: Ingreso Denegado'})
                }
                else{
                  bcrypt.compare(pass, userFind.pass, (err, check) =>{
                      if(check){
                          if(params.gettoken){//se devuelte el token
                              res.status(200).send({token: jwt.createToken(userFind)})
                          }else{//se devuelven datos del usuario. OJO con esto puede que deba cambiar
                              userFind.pass = "ggwp"
                              res.status(200).send(userFind)
                          }
                      }
                      else{res.status(404).send({message:'El usuario no ha podido loguearse: Password incorrecto'})}
                  })
                }
            }else {
                res.status(404).send({message:'El usuario no ha podido loguearse: mail no encontrado'})
            }
        }
    })
}

function saveUsuario(req, res){
    let usuario = new Usuario()
    var params = req.body;
    if(params.pass && params.nombre && params.apellido && params.email){
        usuario.nombre = params.nombre
        usuario.apellido = params.apellido
        usuario.email = params.email
        usuario.rol = params.rol
        Usuario.findOne({email: usuario.email.toLowerCase()}, (err, userFind) => {//Verifico si ya se registraron con ese mail
            if(err) {
                res.status(500).send({message: 'Error al comprobar el usuario'})
            }else{
                if(!userFind){//Si no se encontro usuario en la bd procedo a almacenarlo cifrando el pass
                    bcrypt.hash(params.pass, null, null, function(err, hash){
                        usuario.pass = hash
                        usuario.save((err, eltoStored) => {
                            if(err) res.status(500).send({message: 'Error al guardar el usuario' + usuario.nombre + ' ' + usuario.apellido})
                            res.status(200).send({usuario: eltoStored})
                        })
                    })
                }else {//Si se encontro un usuario registrado con ese mail emito error
                    res.status(500).send({message:'El usuario no puede registrarse: mail utilizado'})
                }
            }
        })
    }else {
        res.status(500).send({message:'Introduce los datos correctamente'})
    }
}

function updateUser (req, res) {
    let usuarioId = req.params.usuarioId
    let update = req.body
    if (update.pass){
      bcrypt.hash(update.pass, null, null, function(err, hash){
          update.pass = hash
          Usuario.findByIdAndUpdate(usuarioId, update, (err, eltoUpdated) => {
              if(err) {
                  res.status(500).send({message: `Error al actualizar la usuario: ${err}`})
              }
              else{
                  if(!eltoUpdated){
                      res.status(404).send({message:"No se han enviado los datos"})
                  }
                  else{
                      res.status(200).send({usuario: eltoUpdated})
                  }
              }
          })
      })
    }
    else{
      Usuario.findByIdAndUpdate(usuarioId, update, (err, eltoUpdated) => {
          if(err) {
              res.status(500).send({message: `Error al actualizar la usuario: ${err}`})
          }
          else{
              if(!eltoUpdated){
                  res.status(404).send({message:"No se han enviado los datos"})
              }
              else{
                  res.status(200).send({usuario: eltoUpdated})
              }
          }
      })
    }

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

function updateSeguimiento(req, res){
  var userId = req.params.usuarioId;
  var update = req.body;
  console.log(update, userId)
  Usuario.findOneAndUpdate({_id:userId}, update, (err, userEdit) =>{
    if(err){
      console.log("Error usuario",userEdit)
      res.status(500).send({message: "Error al obtener usuario"})
    }
    else{
      if(!userEdit){
        console.log("Error",userEdit)
        res.status(404).send({message: "No se ha podido modificar el seguimiento"});
      }
      else{
        console.log("modifico usuario ", userEdit)
        res.status(200).send({usuario: userEdit});
      }
    }
  });
}

function getSeguimiento (req, res) {
    let usuarioId = req.params.usuarioId
    Usuario.findById(usuarioId, (err, usuario) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!usuario) return res.status(404).send({message: 'El usuario no existe'})
        res.status(200).send({usuario: usuario})
    }).select({seguimiento:1})
}


module.exports = {
    getUsuario,
    getUsuarios,
    login,
    saveUsuario,
    updateUser,
    deleteUsuario,
    updateUser,
    updateSeguimiento,
    getSeguimiento
}
