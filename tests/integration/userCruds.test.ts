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
    expect(response.body.data).toHaveProperty('name', fakeUser.name);
    expect(response.body.data).toHaveProperty('email', fakeUser.email);
  });
});
