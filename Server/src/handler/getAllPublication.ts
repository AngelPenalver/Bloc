import { Request, Response } from 'express';
const { Post } = require('../DB_connection');

async function getAllPublication(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const findPublication = await Post.findAll({ where: { userId: userId } });
    return res.status(200).json(findPublication);
  } catch (error) {
    return res.status(400).json({ error: 'Ocurrió un error, ' + error });
  }
}
export default getAllPublication;
