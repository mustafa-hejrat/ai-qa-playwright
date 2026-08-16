import { test, expect } from '@playwright/test';

//valid user name and password login

test('valid user can log in successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Products')).toBeVisible();
});

//invalid user name and password login

test('user cannot log in with an invalid password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText('Epic sadface: Username and password do not match any user in this service')
  ).toBeVisible();
});

//Product/Catalog Testing

test('user can view the product catalog', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify product page
  await expect(page.getByText('Products')).toBeVisible();

  // Verify a product exists
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Verify product price
  await expect(page.getByText('$29.99')).toBeVisible();
});