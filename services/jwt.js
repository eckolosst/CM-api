'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');//para generar timestamps o fechas, etc
var secret = 'clave_secreta_de_logueo_de_usuarios_maokai.1/12'

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        apellido: user.apellido,
        email: user.email,
        iat: moment().unix(),//fecha de creacion del token
        exp: moment().add(30, 'day').unix//tiempo de expiracion del token
    };

    return jwt.encode(payload, secret);
};
