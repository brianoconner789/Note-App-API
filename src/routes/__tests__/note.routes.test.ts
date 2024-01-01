import request from 'supertest';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import authRoutes from '../auth.routes';
import noteRoutes from '../note.routes'
import { NoteModel } from '../../models/note.model';

// Setup an in-memory MongoDB server
const mongod = new MongoMemoryServer();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', noteRoutes);

let authToken:string;
beforeAll(async () => {
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri();
  await mongoose.connect(uri);

  await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });

      // Login to get the authentication token
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(loginResponse.status).toBe(200);
      authToken = loginResponse.body.token;

});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('POST /api/notes', () => {
    it('should create a new note for an authenticated user', async () => {
      // Create a note with the obtained authentication token
      const createNoteResponse = await request(app)
        .post('/api/notes')
        .send({
          title: 'Test Note',
          body: 'This is a test note.',
          tags: ['test', 'integration'],
        })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(201, )
      expect(createNoteResponse.status).toBe(201);
      expect(createNoteResponse.body.note.title).toBe('Test Note');

      // Optionally checking if the note is stored in the database
      const note = await NoteModel.findOne({ title: 'Test Note' });
      expect(note).toBeDefined();
    });
  });

  describe('GET /api/notes', () => {
    it('should get notes for an authenticated user', async () => {
     
      // Get notes with the obtained authentication token
      const getNotesResponse = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
  
      expect(getNotesResponse.body.notes).toBeDefined();
    });
  
    it('should return 401 if user is not authenticated', async () => {
      // Try to get notes without authentication
      const getNotesUnauthorized = await request(app)
        .get('/api/notes')
        .expect(401);
  
    });
  });


  describe('GET /api/notes/search', () => {
    it('should search notes for an authenticated user', async () => {
      
      const searchNotesResponse = await request(app)
        .get('/api/notes/search')
        .send({ "query": "note" }) // Add your query parameters
        .set('Authorization', `Bearer ${authToken}`)
      expect(searchNotesResponse.body.notes).toBeDefined();
    });
  
    it('should return 401 if user is not authenticated', async () => {
      // Try to search notes without authentication
      const searchNotesUnauthorized = await request(app)
        .get('/api/notes/search')
        .query({ query: 'test' }) // Add your query parameters
        .expect(401);
      });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update an existing note for an authenticated user', async () => {
      // Create a new note first
      const createNoteResponse = await request(app)
        .post('/api/notes')
        .send({
          title: 'Test Note',
          body: 'This is a test note.',
          tags: ['test', 'integration'],
        })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(201);
  
      const noteId = createNoteResponse.body.note._id;
  
      // Update the note with the obtained authentication token
      const updateNoteResponse = await request(app)
        .put(`/api/notes/${noteId}`)
        .send({
          title: 'Updated Test Note',
          body: 'This is the updated test note.',
          tags: ['updated', 'integration'],
        })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
  
      expect(updateNoteResponse.status).toBe(200);
      expect(updateNoteResponse.body.note.title).toBe('Updated Test Note');
  
      // Optionally checking if the note is updated in the database
      const updatedNote = await NoteModel.findById(noteId);
      expect(updatedNote?.title).toBe('Updated Test Note');
    });

  });
