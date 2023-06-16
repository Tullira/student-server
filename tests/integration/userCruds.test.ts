import request from 'supertest';
import app from '../../src/app';

import { connection } from '../Helper/database.config';

// you need to be running the back-end for this test to work
// because it tests the database (run "docker-compose up")

describe('User CRUDS', () => {
  beforeAll(async () => connection.create());

  beforeEach(async () => connection.clear());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('should create a user', async () => {
    const fakeUser = {
      name: 'Fake Name',
      email: 'fakeEmail@gmail.com',
      password: 'aaaaaaaa',
    };

    const response = await request(app).post('/user').send(fakeUser);
    expect(response.status).toBe(201);
  });

  it('should not create a user with an existing email', async () => {
    const fakeUser = {
      name: 'Fake Name',
      email: 'fakeEmail@gmail.com',
      password: 'aaaaaaaa',
    };

    await request(app).post('/user').send(fakeUser);

    const response = await request(app).post('/user').send(fakeUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'This email is already registred');
  });

  it('should be able to get a user', async () => {
    const fakeUser = {
      name: 'Fake Name',
      email: 'fakeEmail@gmail.com',
      password: 'aaaaaaaa',
    };

    const { body: { data: { id } } } = await request(app).post('/user').send(fakeUser);

    const response = await request(app).get(`/user/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('name', fakeUser.name);
    expect(response.body.data).toHaveProperty('email', fakeUser.email);
  });

  it('should be able to update a user', async () => {
    const fakeUser = {
      name: 'Fake Name',
      email: 'fakeEmail@gmail.com',
      password: 'aaaaaaaa',
    };

    const { body: { data: { id } } } = await request(app).post('/user').send(fakeUser);

    const response = await request(app).patch(`/user/${id}`).send({ name: 'New Name' });
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('name', 'New Name');
    expect(response.body.data).toHaveProperty('email', fakeUser.email);

    const { body: { data: { name } } } = await request(app).get(`/user/${id}`);
    expect(name).toBe('New Name');
  });

  it('should be able to delete a user', async () => {
    const fakeUser = {
      name: 'Fake Name',
      email: 'fakeEmail@gmail.com',
      password: 'aaaaaaaa',
    };

    const { body: { data: { id } } } = await request(app).post('/user').send(fakeUser);

    const response = await request(app).delete(`/user/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted');

    const deleteResponse = await request(app).get(`/user/${id}`);
    expect(deleteResponse.status).toBe(404);
  });

  it('should not create a user with an invalid email', async () => {
    const fakeUser = {
      name: 'Fake Name',
      email: 'fakeEmail',
      password: 'aaaaaaaa',
    };

    const response = await request(app).post('/user').send(fakeUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Endereço de email inválido');
  });
});
