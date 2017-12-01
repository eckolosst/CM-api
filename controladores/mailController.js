'use strict'

var nodemailer = require('nodemailer');

function sendMail (req, res){
  var emisor = req.emisor
  var destinatario = req.destinatario
  var asunto = req.asunto
  var texto = req.text

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
      res.status(200);
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
