'use strict'

var nodemailer = require('nodemailer');

function sendMail (req, res){
  var params = req.body
  var emisor = params.email
  var destinatario = "api.ciudadmujer@gmail.com"
  var asunto = "Comentario de "+ params.name + " enviado desde la app"
  var texto = "Nombre: " + params.name + "\n\nEmail: " + params.email + "\n\nComentario: " + params.text

  var mailOptions = {
    from: emisor,
    to: destinatario,
    subject: asunto,
    text: texto
  }
  enviarMail(mailOptions)
}

function sendMailPic(req, res){
  var params = req.body
  var destinatario = "api.ciudadmujer@gmail.com"
  var asunto = "Fotografia enviada desde la app"
  // var texto = "Nombre: " + params.name + "\n\nEmail: " + params.email + "\n\nComentario: " params.text

  var img = params.contenido //Fotofrafia tomada
  /*Revisar
  https://stackoverflow.com/questions/24165410/
  nodemailer-send-base64-data-uri-as-attachment-how
  */

  var mailOptions = {
    from: null,
    to: destinatario,
    subject: asunto,
    attachments: [
      {
        filename: 'picture.jpeg',
        content: img.split("base64,")[1],
        encoding: 'base64'
      }
    ]
  }
  enviarMail(mailOptions)
}

function enviarMail(mailOptions){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'api.ciudadmujer@gmail.com',
      pass: 'maokai.1/12',
    }
  })

  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      console.log(error);
      res.status(500).send({message:err.message});
    }else{
      console.log('Mail enviado');
      res.status(200).send({message:'Mail enviado'});
    }
  })
}

module.exports = {
  sendMail,
  sendMailPic
}
