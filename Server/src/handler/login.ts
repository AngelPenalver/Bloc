import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const { User } = require('../DB_connection');
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json('Debe ingresar todos los datos');
    }
    const findUser = await User.findOne({ where: { email: email } });
    if (!findUser) {
      return res
        .status(401)
        .json('No existe ninguna cuenta registrada con ese correo electrónico');
    }
    bcrypt.compare(password, findUser.password, function (err, result) {
      if (err) {
        return res.status(404).json('Error intente de nuevo');
      } else {
        if (result) {
          const userId = findUser.dataValues.id;
          const options = {
            algorithm: 'HS256',
            expiresIn: '1h',
          };
          const payload = {
            userId,
          };
          const token = jwt.sign(payload, secretKey, options);
          if (token) {
            return res.status(200).json({token: token});
          } else {
            return res.status(401).json('Error al crear el token');
          }
        } else {
          return res.status(401).json('La contraseña o el correo electrónico inválidos');
        }
      }
    });
  } catch (error) {
    return res.status(400).json(`Error intente de nuevo o llame a soporte`);
  }
}
export default login;
