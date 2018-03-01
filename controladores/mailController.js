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
    text: texto,
    attachments: []
  }
  var pic = params.picture
  if(pic){
    mailOptions.attachments.push(
      {
        filename: 'picture.jpeg',
        content: pic,
        encoding: 'base64'
      }
    )
  }
  var voiceAudio = params.audio
  if(voiceAudio){
    voiceAudio = voiceAudio.split("data:image/*;charset=utf-8;base64,")[1];
    // console.log(voiceAudio);
    mailOptions.attachments.push(
      {
        filename: 'voiceAudio.mp3',
        content: voiceAudio,
        encoding: 'base64'
      }
    )
  }

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
  sendMail
}
