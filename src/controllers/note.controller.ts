// src/controllers/note.controller.ts
import { Request, Response } from 'express';
import { NoteModel } from '../models/note.model';

export const searchNotes = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    const userId = req.body.userId;

    if (typeof query !== 'string') {
      return res
        .status(400)
        .json({ error: 'Invalid query parameter. Query must be a string.' });
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
};

export const createNote = async (req: Request, res: Response) => {
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
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const notes = await NoteModel.find({ userId });

    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
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
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const userId = req.body.userId;

    const note = await NoteModel.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: req.body },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
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
};

export const shareNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const sharedUserId = req.body.sharedUserId;

    const note = await NoteModel.findOne({
      _id: noteId,
      userId: req.body.userId,
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (note.sharedWith.includes(sharedUserId)) {
      return res
        .status(400)
        .json({ error: 'Note is already shared with this user' });
    }

    note.sharedWith.push(sharedUserId);
    await note.save();

    res.json({ message: 'Note shared successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getSharedNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    const sharedNotes = await NoteModel.find({
      sharedWith: userId,
    });

    res.json({ sharedNotes });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

