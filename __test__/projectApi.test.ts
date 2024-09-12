import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app'; // Assuming your Express app is exported from app.ts


let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // Cleanup and close the database connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Optionally, you can clear any pre-existing data here if needed
});

afterEach(async () => {
  if (mongoose.connection.db) {  // Check if mongoose.connection.db is defined
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

describe('Projects API', () => {
    it('should get all projects', async () => {
      const res = await request(app).get('/apis/projects');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  
    it('should get a single project by ID', async () => {
      const projectId = '66e1f6372b1473ff4ebafd8e'; // Example project ID
      const res = await request(app).get(`/apis/projects/${projectId}`);
      expect(res.statusCode).toEqual(200);
    });
  
    it('should create a new project', async () => {
      const newProject = {
        name: 'Project Alpha',
        description: 'This is project alpha',
        userId: '66e1e726b132e88d69fe1684',
      };
      const res = await request(app)
        .post('/apis/projects')
        .send(newProject);
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data).toHaveProperty('name', 'Project Alpha');
    });
  
    it('should update an existing project', async () => {
      const projectId = '66e1edd4c1d158e83211cb58'; // Example project ID
      const updatedProject = {
        name: 'Project Alpha EDIT',
        description: 'This is project alpha EDIT',
        userId: '66e1e726b132e88d69fe1684',
      };
      const res = await request(app)
        .put(`/apis/projects/${projectId}`)
        .send(updatedProject);
      expect(res.statusCode).toEqual(201);
    });
  
    it('should delete a project', async () => {
      const projectId = '66e1edd4c1d158e83211cb58'; // Example project ID
      const res = await request(app).delete(`/apis/projects/${projectId}`);
      expect(res.statusCode).toEqual(204);
    });
  });