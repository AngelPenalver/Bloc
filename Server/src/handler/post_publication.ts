import { Request, Response } from 'express';
const { Post } = require('../DB_connection');
interface postDataAttribute {
  userId: string,
  title: string,
  description: string
}
interface PostDataInstance extends postDataAttribute{};
const validatePostData = (title: string, description: string, userId: string): string | null => {
  if (!title || !description) {
    return 'Debe ingresar el titulo y la descripción para hacer un Post';
  }
  if (title.length > 100) {
    return 'El titulo no debe de ser mas de 100 caracteres';
  }
  if (description.length > 600) {
    return 'La descripción no debe de ser mas de 600 caracteres';
  }
  if (description.length < 10) {
    return 'La descripción no debe de ser menor de 10 caracteres';
  }
  if (title.length < 10) {
    return 'El titulo no debe de ser menor de 10 caracteres';
  }
  if (!userId) {
    return 'Debe estar logueado para hacer un Post';
  }
  return null;
};

async function postPublication(req: Request, res: Response): Promise<Response> {
  try {
    const { userId, title, description } = req.body;
    const error = validatePostData(title, description, userId);
    if (error) {
      return res.status(400).json({ error });
    }

    const newPostData: PostDataInstance = { userId, title, description };
    const createPost = await Post.create(newPostData);
    if (!createPost) {
      return res.status(409).json({ error: 'Error al crear el post' });
    }
    return res.status(200).json('Enhorabuena! ha sido creado su post con éxito!');
  } catch (error) {
    return res.status(500).json({ error: 'Error, intente de nuevo' });
  }
}

export default postPublication;
