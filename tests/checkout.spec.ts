import { test, expect } from '@playwright/test';

test('user can complete checkout successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

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

  // Add Backpack to cart
  await backpack.getByRole('button', { name: 'Add to cart' }).click();

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify product is in the cart
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Click Checkout
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Enter customer information
  await page.getByPlaceholder('First Name').fill('Mustafa');
  await page.getByPlaceholder('Last Name').fill('Hejrat');
  await page.getByPlaceholder('Zip/Postal Code').fill('M1M 1M1');

  // Continue
  await page.getByRole('button', { name: 'Continue' }).click();

  // Verify checkout overview
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
 await expect(page.locator('[data-test="subtotal-label"]')).toContainText('$29.99');

  // Finish order
  await page.getByRole('button', { name: 'Finish' }).click();

  // Verify successful order
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});