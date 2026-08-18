import { test, expect } from '@playwright/test';

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