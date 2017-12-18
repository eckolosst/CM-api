'use strict'

var nodemailer = require('nodemailer');

function sendMail (req, res){
  var params = req.body
  var emisor = params.email

  var destinatario = "api.ciudadmujer@gmail.com"
  var asunto = "Comentario de "+ params.name + " enviado desde la app"
  var texto = "Nombre: " + params.name + "\nEmail: " + params.email +
  "\nComentario: " + params.text

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'api.ciudadmujer@gmail.com',
      pass: 'maokai.1/12',
    }
  })

  var mailOptions = {
    from: emisor,
    to: destinatario,
    subject: asunto,
    text: texto
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      console.log(error);
      res.status(500).send({message:err.message});
    }else{
      console.log('Mail enviado');
      res.status(200).send({message:'comentario enviado'});
    }
  })
}

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error){
//       console.log(error);
//       res.status(500).send({message:err.message});
//     }else{
//       console.log('Mail enviado');
//       res.status(200);
//     }
//   })
// }

module.exports = {
  sendMail
}
