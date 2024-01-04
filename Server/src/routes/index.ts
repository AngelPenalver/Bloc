import express from 'express';
import register from '../handler/register';
import login from '../handler/login';
import postPublication from '../handler/post_publication';
import getAllNote from '../handler/getAllNote';
import getNoteForId from '../handler/getNoteForId';
import getUser from '../handler/getUser';
import deleteUser from '../handler/deleteUser';
import deleteNote from '../handler/deleteNote';
import editUser from '../handler/editUser';
import authenticateJwt from '../handler/authenticated';

const router = express.Router();

// Rutas para el registro y el login
router.post('/register', register);
router.post('/login', login);

// Rutas para los usuarios
router.get('/user/:id',  getUser);
router.delete('/user/:id',  deleteUser);
router.put('/user/:id',  editUser);

// Rutas para los posts del blog
router.post('/notes/create',  postPublication);
router.put('/notes/update/:noteId',  postPublication);
router.get('/notes/user/:userId',  getAllNote);
router.get('/notes/:id',  getNoteForId);
router.delete('/notes/:id',  deleteNote);

export default router;
