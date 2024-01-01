// src/models/note.model.ts
import mongoose, { Document, Schema } from 'mongoose'

export interface INote extends Document {
  title: string
  body: string
  tags: string[]
  userId: string
  sharedWith: string[] // New field for shared users
}

const noteSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: { type: [String], default: [] },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sharedWith: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export const NoteModel = mongoose.model<INote>('Note', noteSchema)
