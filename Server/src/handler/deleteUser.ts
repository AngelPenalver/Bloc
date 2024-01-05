import { Request, Response } from 'express';
const { User } = require('../DB_connection');
async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { verificationCode } = req.body;
    const dateExp = new Date()
    if (!userId) {
      return res.status(400).json('Necesita estar logueado para eliminar su cuenta');
    }
    if(!verificationCode){
      return res.status(400).json('Debe ingresar el código enviado')
    }
    if (userId) {
      const foundUser = await User.findByPk(userId);
      if(foundUser.verification_expires < dateExp){
        return res.status(400).json('Ha excedido el tiempo para verificar el código')
      }
      if(verificationCode !== foundUser.verification_code){
        return res.status(400).json('El código ingresado es distinto al enviado')
      }
      await foundUser.destroy()
      return res.status(200).json('Su cuenta ha sido eliminada con éxito')
    }
  } catch (error) {
    return res.status(400).json('Ocurrió un error inesperado ' + error);
  }
}
export default deleteUser;
