import express from 'express';
import * as noteController from '../controllers/note.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticateUser);

router.get('/notes/search', noteController.searchNotes);
router.post('/notes', noteController.createNote);
router.get('/notes', noteController.getNotes);
router.get('/notes/:id', noteController.getNoteById);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);
router.post('/notes/:id/share', noteController.shareNote);
router.get('/shared-notes', noteController.getSharedNotes);

export default router;
