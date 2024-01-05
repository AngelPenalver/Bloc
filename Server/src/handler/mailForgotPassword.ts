import { Request, Response } from 'express';
import { transporter } from '../config/mail';
import generarCodigo from '../config/generateCode';
const { User } = require('../DB_connection');

async function mailForgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json('El correo no puede estar vacío');
    }

    const foundMail = await User.findOne({ where: { email: email } });
    if (!foundMail) {
      return res
        .status(400)
        .json('No se encontró una cuenta con ese correo electrónico');
    }
    if (foundMail) {
      const code = generarCodigo();
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 2);
      foundMail.update({
        verification_code: code,
        verification_expires: expiry,
      });
      const info = await transporter.sendMail({
        from: '"Blocy " <deploy-client-bloc.vercel.app',
        to: foundMail.email,
        subject: 'Solicitud de recuperación de contraseña.',

        html: `<p>Hola, ${foundMail.first_name}</p>
        <p>Hemos recibido una solicitud para recuperar la cuenta de Blocy de ${foundMail.email}</p>
        <p>Usa este código para completar la configuración de este correo de recuperación: </p> <h1>${code}</h1>

        <p>Este código tiene una expiración de 2 horas.</p>`,
      });
      if (info) {
        return res
          .status(200)
          .json(
            'Se ha enviado el código de verificación a su correo electrónico'
          );
      }
    }
  } catch (error) {
    return res.status(400).json('Hubo un error desconocido ' + error);
  }
}
export default mailForgotPassword;
