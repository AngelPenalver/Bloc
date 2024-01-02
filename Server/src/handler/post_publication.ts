  import { Request, Response } from 'express';
  const { Note } = require('../DB_connection');
  interface NoteDataAttribute {
    userId: string;
    title: string;
    description: string;
  }
  interface NoteDataInstance extends NoteDataAttribute {}
  const validateNoteData = (
    title: string,
    description: string,
    userId: string
  ): string | null => {
    if (title.length > 100) {
      return 'El titulo no debe de ser mas de 100 caracteres';
    }
    if (description.length > 1000) {
      return 'La descripción no debe de ser mas de 1000 caracteres';
    }
    if (!userId) {
      return 'Debe estar logueado para hacer un Note';
    }
    return null;
  };

  async function NotePublication(req: Request, res: Response): Promise<Response> {
    try {
      const { noteId } = req.params;
      const { userId, title, description } = req.body;
      const error = validateNoteData(title, description, userId);
      if (error) {
        return res.status(400).json({ error });
      }
      const newNoteData: NoteDataInstance = { userId, title, description };
      if (noteId) {
        try {
          const findNote = await Note.findByPk(noteId);
          if (findNote) {
            await findNote.update(newNoteData);
            return res
              .status(200)
              .json({ mensaje: 'Nota actualizada con éxito' });
          } else {
            return res
              .status(404)
              .json({ error: 'No hay ninguna nota con ese id' });
          }
        } catch (error) {
          return res
            .status(400)
            .json({ error: 'Hubo un error actualizar la nota' });
        }
      } else {
        const createNote = await Note.create(newNoteData);
        if (!createNote) {
          return res.status(409).json({ error: 'Error al crear el Note' });
        }
        return res
          .status(200)
          .json('Enhorabuena! ha sido creado su nota con éxito!');
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error, intente de nuevo' });
    }
  }

  export default NotePublication;
