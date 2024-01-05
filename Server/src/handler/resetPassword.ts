import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const { User } = require('../DB_connection');

async function resetPassword(req: Request, res: Response) {
  try {
    const { email, newPassword, verificationCode } = req.body;
    const expDate = new Date();
    if (!email || !newPassword || !verificationCode) {
      return res.status(400).json('No pueden haber campos vacíos');
    }
    const userFound = await User.findOne({ where: { email: email } });
    if (!userFound) {
      return res
        .status(400)
        .json(
          'No se encontró un usuario con ese correo electrónico registrado'
        );
    }
    if (!userFound.verification_expires) {
      return res
        .status(400)
        .json('Debe solicitar un código para poder cambiar su contraseña');
    }
    if (expDate > userFound.verification_expires) {
      return res.status(400).json('Ya ha excedido el tiempo para verificar');
    }

    if (verificationCode !== userFound.verification_code) {
      return res
        .status(400)
        .json('El código introducido es distinto al enviado');
    }
    if (verificationCode === userFound.verification_code) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      await userFound.update({
        password: hash,
        verification_code: null,
        verification_expires: null,
      });

      return res.status(200).json('La contraseña ha sido cambiada con éxito');
    }
  } catch (error) {
    return res.status(400).json('Hubo un error: ' + error);
  }
}
export default resetPassword;
