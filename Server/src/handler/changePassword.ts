import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { log } from 'console';
const { User } = require('../DB_connection');

async function changePassword(req: Request, res: Response) {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.params;
    const salt = await bcrypt.genSalt(10);
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json('Ambas contraseñas son requeridas para cambiar contraseña');
    }
    const userFound = await User.findByPk(userId);

    if (!userFound) {
      return res.status(400).json('Usuario no encontrado');
    }

    bcrypt.compare(
      oldPassword,
      userFound.password,
      async function (err, result) {
        if (err) {
          return res.status(400).json('Error intente de nuevo');
        }
        if (result) {
          const hash = await bcrypt.hash(newPassword, salt);
          await userFound.update({ password: hash });
          return res.status(200).json('Contraseña actualizada con éxito!');
        } else {
          return res.status(400).json('Contraseña incorrecta');
        }
      }
    );
  } catch (error) {
    return res.status(400).json('Hubo un error desconocido ' + error);
  }
}
export default changePassword;
