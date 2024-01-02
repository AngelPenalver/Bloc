import { Request, Response } from 'express';
const { User } = require('../DB_connection');
async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json('Necesita una ID para eliminar un usuario');
    }
    if (id) {
      const findUser = await User.findByPk(id);
      if (findUser) {
        await findUser.destroy();
        return res.status(200).json('Usuario eliminado con éxito!');
      } else {
        return res.status(400).json('No se encontró un usuario con ese ID');
      }
    }
  } catch (error) {
    return res.status(400).json('Ocurrió un error inesperado ' + error);
  }
}
export default deleteUser;
