// src/routes/note.routes.ts
import express, { Request, Response } from 'express';
import { NoteModel } from '../models/note.model';
import { authenticateUser } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticateUser);

router.get('/notes/search', async (req: Request, res: Response) => {
    console.log(req.query);
    try {
      const { query } = req.body;
      const userId = req.body.userId;
  
      if (typeof query !== 'string') {
        return res.status(400).json({ error: 'Invalid query parameter. Query must be a string.' });
      }
  
      const notes = await NoteModel.find({
        userId,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { body: { $regex: query, $options: 'i' } },
          { tags: { $regex: query, $options: 'i' } },
        ],
      });
  
      res.json({ notes });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });  

router.post('/notes', async (req: Request, res: Response) => {
  try {
    const { title, body, tags } = req.body;
    const userId = req.body.userId;

    const note = await NoteModel.create({
      title,
      body,
      tags,
      userId,
    });

    res.status(201).json({ note });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/notes', async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const notes = await NoteModel.find({ userId });

    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/notes/:id', async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const userId = req.body.userId;

    const note = await NoteModel.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put('/notes/:id', async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const userId = req.body.userId;

    const note = await NoteModel.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: req.body },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.delete('/notes/:id', async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const userId = req.body.userId;

    const note = await NoteModel.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


export default router;