import { Request, Response } from 'express';
const { Note } = require('../DB_connection');

async function getNoteForId(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json('Error, intente de nuevo');
    } else {
      const findNote = await Note.findByPk(id)
      if(findNote){

        return res.status(200).json(findNote)
      }else{
        return res.status(400).json('Nota no encontrada')
      }
    }
  } catch (error) {
    return res.status(400).json('Error desconocido, intente de nuevo')
  }
}
export default getNoteForId;
