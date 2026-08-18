import { test, expect } from '@playwright/test';


test('valid user can log in successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Products')).toBeVisible();
});


test('user cannot log in with an invalid password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText('Epic sadface: Username and password do not match any user in this service')
  ).toBeVisible();
});


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


test('user can add the product to the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify product page
  await expect(page.getByText('Products')).toBeVisible();

  // Find Sauce Labs Backpack
  const backpack = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });

  // Verify Backpack and price
  await expect(backpack).toBeVisible();
  await expect(backpack.getByText('$29.99')).toBeVisible();

  // Add Backpack to cart
  await backpack.getByRole('button', { name: 'Add to cart' }).click({ force: true });

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify product is in the cart
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Verify product price

  await expect(page.getByText('$29.99')).toBeVisible();
});
