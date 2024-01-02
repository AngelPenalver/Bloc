import { Response, Request } from 'express';
const { User } = require('../DB_connection');

async function editUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    if (!id) {
      return res.status(400).json('Necesita ingresar un ID');
    }
    if (id) {
      if (!first_name || !last_name) {
        return res.status(400).json('No pueden haber campos vacios');
      }
      const findUser = await User.findByPk(id);
      if(findUser){
        await findUser.update({first_name, last_name})
        return res.status(200).json('Usuario actualizado con éxito')
      }else{
        return res.status(400).json('No se encontró un usuario con ese ID')
      }
    }
  } catch (error) {
    return res.status(400).json('Ocurrió un error inesperado ' + error)
  }
}
export default editUser;
