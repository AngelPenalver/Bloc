import { Request, Response } from 'express';
const { User } = require('../DB_connection');
async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (id) {
      const findUser = await User.findByPk(id);
      if(!findUser){
        return res.status(400).json('No se encontró un usuario con ese ID')
      }else{
        return res.status(200).json(findUser)
      }
    }else{
      return res.status(400).json('Debe ingresar una ID')
    }
  } catch (error) {
    return res.status(400).json('Ocurrió un error inesperado, intente de nuevo ' + error)

  }
}
export default getUser;
