'use strict'
// framework de nodeJS
const express = require('express')
// librería que da varios middlewares para manejar datos de peticion
const bodyParser = require('body-parser')

const app = express()

const usuarioCtrl = require('./controladores/usuarioController')
const seccionCtrl = require('./controladores/seccionController')

var md_auth = require('./middlewares/autenticacion')

// middlewares
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use((req, res, next) =>{ //allow cross origin requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-KEY, Access-Control-Allow-Method");
    res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,DELETE")
    res.header("Allow","GET,POST,OPTIONS,PUT,DELETE")
    next();
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
                        /*      PETICIONES PARA ABM     */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Usuario
/*En cada una de las rutas que quiera proteger con token solo tengo que agregar
el middleware md_auth como se ve en el siguiente ejemplo:
app.get('/api/usuario/',md_auth.ensureAuth, usuarioCtrl.getUsuarios)
entonces cuando se quiera ingresar a esa ruta, se debe pasar en la peticion el
token, en un atriburo llamado 'Authorization'
*/
app.get('/api/usuario/', md_auth.ensureAuth, usuarioCtrl.getUsuarios)
app.get('/api/usuario/:usuarioId', md_auth.ensureAuth, usuarioCtrl.getUsuario)
app.post('/api/registro/', md_auth.ensureAuth, usuarioCtrl.saveUsuario)
app.post('/api/usuarioLog/', md_auth.ensureAuth, usuarioCtrl.login)
app.put('/api/update-usuario/:usuarioId', md_auth.ensureAuth, usuarioCtrl.updateUsuario)
app.delete('/api/usuario/:usuarioId', md_auth.ensureAuth, usuarioCtrl.deleteUsuario)
// Seccion
app.get('/api/seccion/', md_auth.ensureAuth, seccionCtrl.getSecciones)
app.get('/api/seccion/:seccionId', md_auth.ensureAuth, seccionCtrl.getSeccion)
app.post('/api/seccion/', md_auth.ensureAuth, seccionCtrl.saveSeccion)
app.put('/api/seccion/:seccionId', md_auth.ensureAuth, seccionCtrl.updateSeccion)
app.delete('/api/seccion/:seccionId', md_auth.ensureAuth, seccionCtrl.deleteSeccion)


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
                        /*      PETICIONES PARA APP    */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.get('/api/titulos/', md_auth.ensureAuth, seccionCtrl.getTitulos)


module.exports = app
