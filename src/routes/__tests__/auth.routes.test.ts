import request from 'supertest';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import authRoutes from '../auth.routes';
import noteRoutes from '../note.routes'
import { UserModel } from '../../models/user.model';

// Setup an in-memory MongoDB server
const mongod = new MongoMemoryServer();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', noteRoutes);

beforeAll(async () => {
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Auth Routes', () => {
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(response.status).toBe(201);
      expect(response.body.user.username).toBe('testuser');

      const user = await UserModel.findOne({ username: 'testuser' });
      expect(user).toBeDefined();
    });
  });

  describe('POST /auth/login', () => {
    it('should log in a user with valid credentials', async () => {
      // Register a user first
      await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });
});
