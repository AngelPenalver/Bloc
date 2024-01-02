import { Request, Response } from "express";
const {Note} = require('../DB_connection')

async function deleteNote(req: Request, res: Response) {
  try {
    const {id} = req.params
    if(!id){
      return res.status(400).json('Debe ingresar una ID')
    }
    if(id){
      const findNote = await Note.findByPk(id)
      if(findNote){
        await findNote.destroy()
        return res.status(200).json('Nota eliminada con éxito!')
      }else{
        return res.status(400).json('No se encontró una nota con ese ID')
      }
    }
  } catch (error) {
    return res.status(200).json('Ocurrió un error inesperado ' + error)
  }
}

export default deleteNote
