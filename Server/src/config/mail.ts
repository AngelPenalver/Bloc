import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'blocy43@gmail.com',
    pass: process.env.PASS_GOOGLE,
  },
});

transporter
  .verify()
  .then(() => {
    console.log('Listo para enviar correos');
  })
  .catch((error) => {
    console.log(error);
  });
