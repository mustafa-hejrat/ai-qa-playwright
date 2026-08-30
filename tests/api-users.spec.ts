import { test, expect } from '@playwright/test';

// GET existing user
test('GET user successfully', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const user = await response.json();

  expect(user.id).toBe(1);
  expect(user.name).toBeTruthy();
  expect(typeof user.name).toBe('string');
  expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

//GET non-existing user
test('GET non-existing user returns 404', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/999');

  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body).toEqual({});
});

//POST create user
test('POST create a new user', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: {
      name: 'Mustafa Hejrat',
      username: 'mustafa',
      email: 'mustafa@example.com'
    }
  });

  expect(response.status()).toBe(201);
  expect(response.headers()['content-type']).toContain('application/json');
  const user = await response.json();
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('username');
  expect(user).toHaveProperty('email');

  expect(typeof user.id).toBe('number');
  expect(typeof user.name).toBe('string');
  expect(typeof user.username).toBe('string');
  expect(typeof user.email).toBe('string');
  
  expect(user.id).toBeTruthy();
  expect(user.name).toBe('Mustafa Hejrat');
  expect(user.username).toBe('mustafa');
  expect(user.email).toBe('mustafa@example.com');
});

//PUT update user
test('PUT update an existing user', async ({ request }) => {
  const response = await request.put('https://jsonplaceholder.typicode.com/users/1', {
    data: {
      name: 'Mustafa Hejrat',
      username: 'mustafa',
      email: 'mustafa.new@example.com'
    }
  });
 // Status code
  expect(response.status()).toBe(200);
 // Response header
  expect(response.headers()['content-type']).toContain('application/json');

  const user = await response.json();
 // Response structure
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('username');
  expect(user).toHaveProperty('email');
  expect(typeof user.id).toBe('number');
  expect(typeof user.name).toBe('string');
  expect(typeof user.username).toBe('string');
  expect(typeof user.email).toBe('string');
 // Response data
  expect(user.name).toBe('Mustafa Hejrat');
  expect(user.username).toBe('mustafa');
  expect(user.email).toBe('mustafa.new@example.com'); 
  
});

//DELETE user
test('DELETE an existing user', async ({ request }) => {
  const response = await request.delete('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200);
});

// POST with missing data
test('POST create user with missing data', async ({ request }) => {
  const response = await request.post(
    'https://jsonplaceholder.typicode.com/users',
    {
      data: {}
    }
  );

  expect(response.status()).toBe(201);

  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();

  expect(body).toHaveProperty('id');
  expect(typeof body.id).toBe('number');
  expect(body.id).toBeTruthy();
});

// POST with invalid email
test('POST create user with invalid email', async ({ request }) => {
  const response = await request.post(
    'https://jsonplaceholder.typicode.com/users',
    {
      data: {
        name: 'Mustafa Hejrat',
        username: 'mustafa',
        email: 'mustafa-invalid-email'
      }
    }
  );

  expect(response.status()).toBe(201);

  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();

  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('name');
  expect(body).toHaveProperty('username');
  expect(body).toHaveProperty('email');

  expect(typeof body.id).toBe('number');
  expect(body.id).toBeTruthy();

  expect(body.name).toBe('Mustafa Hejrat');
  expect(body.username).toBe('mustafa');
  expect(body.email).toBe('mustafa-invalid-email');
});

// PUT with invalid data
test('PUT update user with invalid data', async ({ request }) => {
  const response = await request.put(
    'https://jsonplaceholder.typicode.com/users/1',
    {
      data: {
        name: '',
        username: '',
        email: 'invalid-email'
      }
    }
  );

  expect(response.status()).toBe(200);

  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();

  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('name');
  expect(body).toHaveProperty('username');
  expect(body).toHaveProperty('email');

  expect(typeof body.id).toBe('number');
  expect(typeof body.name).toBe('string');
  expect(typeof body.username).toBe('string');
  expect(typeof body.email).toBe('string');

  expect(body.id).toBe(1);
  expect(body.name).toBe('');
  expect(body.username).toBe('');
  expect(body.email).toBe('invalid-email');
});

// DELETE non-existing user
test('DELETE non-existing user', async ({ request }) => {
  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/users/999'
  );

  console.log('Status:', response.status());

  const body = await response.json();

  console.log('Response:', body);
});

// DELETE non-existing user
test('DELETE non-existing user returns 200 for JSONPlaceholder', async ({ request }) => {
  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/users/999'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toEqual({});
});