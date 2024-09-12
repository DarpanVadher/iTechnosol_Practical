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

describe('Users API', () => {
  it('should get all users', async () => {
    const res = await request(app).get('/apis/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true); // Assuming response is an array of users
  });

  it('should get a single user by ID', async () => {
    const userId = '66e27140cd5e80b90dc1d213'; // Example user ID
    const res = await request(app).get(`/apis/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    // expect(res.body.data[0]).toHaveProperty('_id', userId); // Assuming user object contains an _id field
  });

  it('should create a new user', async () => {
    const newUser = { name: 'TEST2', email: 'test2@gmail.com' };
    const res = await request(app)
      .post('/apis/users')
      .send(newUser);
    expect(res.statusCode).toEqual(201); // Assuming 201 status code for successful creation
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data).toHaveProperty('name', 'TEST2');
  });

  it('should update an existing user', async () => {
    const userId = '66e1e9ec4e0506fad2b471a5'; // Example user ID
    const updatedUser = { name: 'TEST2 EDIT', email: 'test2edit@gmail.com' };
    const res = await request(app)
      .put(`/apis/users/${userId}`)
      .send(updatedUser);
    expect(res.statusCode).toEqual(201);
    // expect(res.body.data).toHaveProperty('name', 'TEST2 EDIT');
  });

  it('should delete a user', async () => {
    const userId = '66e1e9ec4e0506fad2b471a5'; // Example user ID
    const res = await request(app).delete(`/apis/users/${userId}`);
    expect(res.statusCode).toEqual(204);
  });
});