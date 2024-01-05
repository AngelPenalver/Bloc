import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const { User } = require('../DB_connection');
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

interface RegisterRequest extends Request {
  body: {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
  };
}

async function register(req: RegisterRequest, res: Response) {
  try {
    const { first_name, last_name, password, email } = req.body;

    if (!first_name || !last_name || !password || !email) {
      return res.status(404).json('Debe ingresar todos los datos');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { first_name, last_name, password: hash },
    });
    if (created) {
      const userId = user.dataValues.id;
      const options = {
        algorithm: 'HS256',
        expiresIn: '60min',
      };
      const payload = {
        userId,
      };
      const token = jwt.sign(payload, secretKey, options);
      if (token) {
        return res.status(200).json(token);
      } else {
        return res.status(400).json('Error al crear el token');
      }
    } else {
      return res
        .status(400)
        .json('Ya existe un usuario con ese correo electrónico');
    }
  } catch (error) {
    res.status(400).json('Error en el servidor, intente de nuevo ' + error);
  }
}
export default register;
