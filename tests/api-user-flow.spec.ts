
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

  expect(createResponse.status()).toBe(201);

  const createdUser = await createResponse.json();

  // Verify the simulated created user
  expect(createdUser.id).toBeTruthy();
  expect(createdUser.name).toBe('Mustafa Hejrat');
  expect(createdUser.username).toBe('mustafa');
  expect(createdUser.email).toBe('mustafa@example.com');

  console.log('Created User:', createdUser);

  // Step 2: Get an existing user
  const getResponse = await request.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  expect(getResponse.status()).toBe(200);

  const user = await getResponse.json();

  // Verify the existing user's data
  expect(user.id).toBe(1);
  expect(user.name).toBe('Leanne Graham');

  console.log('Retrieved User:', user);
});

test('Update an existing user', async ({ request }) => {

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

  expect(updateResponse.status()).toBe(200);

  const updatedUser = await updateResponse.json();

  expect(updatedUser.id).toBe(1);
  expect(updatedUser.name).toBe('Mustafa Hejrat');
  expect(updatedUser.username).toBe('mustafa');
  expect(updatedUser.email).toBe('mustafa@example.com');

  console.log('Updated User:', updatedUser);
});

test('Delete an existing user', async ({ request }) => {

  const deleteResponse = await request.delete(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  expect(deleteBody).toEqual({});

  console.log('User deleted successfully');
});