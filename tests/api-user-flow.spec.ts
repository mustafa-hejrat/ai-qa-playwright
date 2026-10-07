import { test, expect } from '@playwright/test';

test('Create a user and then get the user', async ({ request }) => {

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

  // Verify POST response
  expect(createResponse.status()).toBe(201);

  const createdUser = await createResponse.json();

  // Get the ID created by the API
  const userId = createdUser.id;

  expect(userId).toBeTruthy();

  console.log('Created User ID:', userId);


  // Step 2: Get the created user
  const getResponse = await request.get(
  'https://jsonplaceholder.typicode.com/users/1'
);

  // Verify GET response
  expect(getResponse.status()).toBe(200);

  const user = await getResponse.json();

  console.log('User:', user);

  expect(user.id).toBe(1);
});

test('Update an existing user', async ({ request }) => {

  // Step 1: Update user 1
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

  // Verify status code
  expect(updateResponse.status()).toBe(200);

  // Get response body
  const updatedUser = await updateResponse.json();

  // Verify updated data
  expect(updatedUser.id).toBe(1);
  expect(updatedUser.name).toBe('Mustafa Hejrat');
  expect(updatedUser.username).toBe('mustafa');
  expect(updatedUser.email).toBe('mustafa@example.com');

  console.log('Updated User:', updatedUser);
});

test('Delete an existing user', async ({ request }) => {

  // Step 1: Delete user 1
  const deleteResponse = await request.delete(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  // Verify status code
  expect(deleteResponse.status()).toBe(200);

  // Get response body
  const deleteBody = await deleteResponse.json();

  // Verify response body
  expect(deleteBody).toEqual({});

  console.log('User deleted successfully');
});