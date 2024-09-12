import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app'; // Assuming your Express app is exported from app.ts

let mongoServer: MongoMemoryServer;

jest.setTimeout(30000); // Set timeout to 30 seconds if needed

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

afterEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

describe('Tasks API', () => {
  it('should get all tasks', async () => {
    const res = await request(app).get('/apis/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true); // Assuming response is an array of tasks
  });

  it('should get a single task by ID', async () => {
    const taskId = '66e1f0216ac0c7eda763cf81'; // Example task ID
    const res = await request(app).get(`/apis/tasks/${taskId}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should create a new task', async () => {
    const newTask = {
      title: 'Task 2',
      description: 'This is task 1',
      status: 'pending',
      projectId: '66e1f6372b1473ff4ebafd8e'
    };
    const res = await request(app)
      .post('/apis/tasks')
      .send(newTask);
    expect(res.statusCode).toEqual(201); // Assuming 201 status code for successful creation
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data).toHaveProperty('title', 'Task 2');
  });

  it('should update an existing task', async () => {
    const taskId = '66e1f0216ac0c7eda763cf81'; // Example task ID
    const updatedTask = {
      title: 'Task 1 EDIT',
      description: 'This is task 1',
      status: 'pending',
      projectId: '66e1edd4c1d158e83211cb58'
    };
    const res = await request(app)
      .put(`/apis/tasks/${taskId}`)
      .send(updatedTask);
    expect(res.statusCode).toEqual(201);
  });

  it('should delete a task', async () => {
    const taskId = '66e1f0216ac0c7eda763cf81'; // Example task ID
    const res = await request(app).delete(`/apis/tasks/${taskId}`);
    expect(res.statusCode).toEqual(204);
  });
});
