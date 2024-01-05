import { Request, Response } from 'express';
import generarCodigo from '../config/generateCode';
import { transporter } from '../config/mail';
const { User } = require('../DB_connection');
async function mailDeleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const userFound = await User.findByPk(userId);
    if(!userFound){
      return res.status(400).json('No se encontró un usuario con esa ID registrado')
    }else{
      const code = generarCodigo()
      const expiry = new Date()
      expiry.setHours(expiry.getHours() + 2);
      await userFound.update({
        verification_code: code,
        verification_expires: expiry
      })
      const info = await transporter.sendMail({
        from: '"Blocy " <deploy-client-bloc.vercel.app',
        to: userFound.email,
        subject: 'Solicitud de eliminación de cuenta.',

        html: `<p>Hola, ${userFound.first_name}</p>
        <p>Hemos recibido una solicitud para <strong>eliminar</strong> la cuenta de Blocy de ${userFound.email}</p>
        <p>Usa este código para completar la verificación para la eliminación de la cuenta: </p> <h1>${code}</h1>

        <p>Este código tiene una expiración de 2 horas.</p>`,
      });
      if(info){
        return res.status(200).json('El código ha sido enviado a su correo electrónico')
      }
      if(!info){
        return res.status(400).json('Hubo un error al enviar el código, por favor intente de nuevo')
      }
    }

  } catch (error) {
    return res.status(400).json('Hubo un error: ' + error)
  }
}
export default mailDeleteUser;
