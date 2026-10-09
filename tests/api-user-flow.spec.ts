
import { test, expect } from '@playwright/test';

test('Create a user and get an existing user', async ({ request }) => {

  // Step 1: Create a new user
  const createResponse = await request.post(
    'https://jsonplaceholder.typicode.com/users',
    {
      data: {
        name: 'Mustafa Hejrat',
        username: 'mustafa',
        email: 'mustafa@example.com'
      }
    }
  );

  // Verify the response
  expect(createResponse.status()).toBe(201);
  expect(createResponse.headers()['content-type'])
    .toContain('application/json');

  const createdUser = await createResponse.json();

  // Verify the created user
  expect(createdUser.id).toEqual(expect.any(Number));
  expect(createdUser.id).toBeGreaterThan(0);
  expect(createdUser.name).toBe('Mustafa Hejrat');
  expect(createdUser.username).toBe('mustafa');
  expect(createdUser.email).toBe('mustafa@example.com');
  expect(createdUser.email)
    .toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  // Step 2: Get an existing user
  const getResponse = await request.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  expect(getResponse.status()).toBe(200);
  expect(getResponse.headers()['content-type'])
    .toContain('application/json');

  const user = await getResponse.json();

  // Verify the existing user
  expect(user.id).toBe(1);
  expect(user.name).toBe('Leanne Graham');
  expect(user.username).toBe('Bret');
  expect(user.email).toBe('Sincere@april.biz');
});

test('Update an existing user', async ({ request }) => {

  // Step 1: Send a PUT request to update user 1
  const updateResponse = await request.put(
    'https://jsonplaceholder.typicode.com/users/1',
    {
      data: {
        name: 'Mustafa Hejrat',
        username: 'mustafa',
        email: 'mustafa@example.com'
      }
    }
  );

  // Step 2: Verify the HTTP response
  expect(updateResponse.status()).toBe(200);
  expect(updateResponse.headers()['content-type'])
    .toContain('application/json');

  // Step 3: Read the response body
  const updatedUser = await updateResponse.json();

  // Step 4: Verify the updated user data
  expect(updatedUser.id).toBe(1);
  expect(updatedUser.name).toBe('Mustafa Hejrat');
  expect(updatedUser.username).toBe('mustafa');
  expect(updatedUser.email).toBe('mustafa@example.com');

  // Step 5: Validate the email format
  expect(updatedUser.email)
    .toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  console.log('Updated User:', updatedUser);
});


test('Delete an existing user', async ({ request }) => {

  // Step 1: Send a DELETE request
  const deleteResponse = await request.delete(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  // Step 2: Verify the HTTP response
  expect(deleteResponse.status()).toBe(200);
  expect(deleteResponse.headers()['content-type'])
    .toContain('application/json');

  // Step 3: Read and verify the response body
  const deleteBody = await deleteResponse.json();

  expect(deleteBody).toEqual({});

  console.log('User deleted successfully');
});

test('GET a non-existing user', async ({ request }) => {

  // Step 1: Request a user ID that does not exist
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/9999'
  );

  // Step 2: Verify the HTTP status
  expect(response.status()).toBe(404);

  // Step 3: Verify the response body
  const responseBody = await response.json();

  expect(responseBody).toEqual({});
});