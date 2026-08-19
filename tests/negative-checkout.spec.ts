import { test, expect } from '@playwright/test';

test('checkout fails when first name is missing', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add product to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Go to checkout
  await page.locator('[data-test="checkout"]').click();

  // Leave First Name empty
  await page.locator('[data-test="lastName"]').fill('Test');
  await page.locator('[data-test="postalCode"]').fill('M2N 1A1');

  // Click Continue
  await page.locator('[data-test="continue"]').click();

  // Verify error message
  await expect(page.locator('[data-test="error"]'))
    .toContainText('First Name is required');
});