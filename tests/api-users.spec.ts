import { test, expect } from '@playwright/test';

//GET existing user
test('GET user successfully', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200);

  const user = await response.json();

  expect(user.id).toBe(1);
  expect(user.name).toBeTruthy();
  expect(user.email).toBeTruthy();
});

//GET non-existing user
test('GET non-existing user returns 404', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/999');

  expect(response.status()).toBe(404);
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

  const user = await response.json();

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

  expect(response.status()).toBe(200);

  const user = await response.json();

  expect(user.name).toBe('Mustafa Hejrat');
  expect(user.username).toBe('mustafa');
  expect(user.email).toBe('mustafa.new@example.com');
});

//DELETE user
test('DELETE an existing user', async ({ request }) => {
  const response = await request.delete('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200);
});