import request from 'supertest';
const { app, server } = require('../app');
import { sequelize } from '../config/db';
import Task from '../models/Task';
import jwt from 'jsonwebtoken';
require ('dotenv').config();

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset DB for tests

  // Mock user and token
  const user = { id: 1 };
  token = jwt.sign(user, process.env.JWT_SECRET);
});

afterAll(async () => {
  server.close();
});

describe('Task API', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Task',
          description: 'Task for testing',
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('Test Task');
    });
    it('should fetch all tasks', async () => {
        const res = await request(app)
          .get('/api/tasks')
          .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
      });
    
      it('should update a task', async () => {
        const task = await Task.findOne();
        const res = await request(app)
          .put('/api/tasks/$ {task.id}')
          .set('Authorization', `Bearer ${token}`) 
          .send({ title: 'Updated Task' });
          expect(res.statusCode).toBe(404);
    expect(res.body.title).toBe('Updated Task');
  });

  it('should delete a task', async () => {
    const task = await Task.findOne();
    const res = await request(app)
      .delete('/api/tasks/${Task.id}')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    const deletedTask = await Task.findByPk(Task.id);
    expect(deletedTask).toBeNull();
    });
});