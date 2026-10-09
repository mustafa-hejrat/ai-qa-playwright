import { test, expect } from '@playwright/test';


test('checkout fails when postal code is missing', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add product to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Open cart and go to checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  // Fill in the required fields, leaving postal code empty
  const firstName = page.locator('[data-test="firstName"]');
  const lastName = page.locator('[data-test="lastName"]');
  const postalCode = page.locator('[data-test="postalCode"]');

  await firstName.fill('Mustafa');
  await lastName.fill('Test');

  // Verify the form values before submitting
  await expect(firstName).toHaveValue('Mustafa');
  await expect(lastName).toHaveValue('Test');
  await expect(postalCode).toHaveValue('');

  // Submit the form
  await page.locator('[data-test="continue"]').click();

  // Verify the expected validation error
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Postal Code is required');
});

test('checkout fails when last name is missing', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add product to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Open cart and go to checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  // Fill first name and postal code; leave last name empty
  const firstName = page.locator('[data-test="firstName"]');
  const lastName = page.locator('[data-test="lastName"]');
  const postalCode = page.locator('[data-test="postalCode"]');

  await firstName.fill('Mustafa');
  await postalCode.fill('M2N 1A1');

  // Verify the form values before submitting
  await expect(firstName).toHaveValue('Mustafa');
  await expect(lastName).toHaveValue('');
  await expect(postalCode).toHaveValue('M2N 1A1');

  // Submit the form
  await page.locator('[data-test="continue"]').click();

  // Verify the expected validation error
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Last Name is required');
});

test('user can complete checkout successfully', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Add product to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Open cart and go to checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  // Fill in checkout information
  await page.locator('[data-test="firstName"]').fill('Mustafa');
  await page.locator('[data-test="lastName"]').fill('Test');
  await page.locator('[data-test="postalCode"]').fill('M2N 1A1');

  // Continue to order overview
  await page.locator('[data-test="continue"]').click();

  // Verify the order overview
  await expect(page.locator('[data-test="title"]'))
    .toHaveText('Checkout: Overview');

  // Finish the order
  await page.locator('[data-test="finish"]').click();

  // Verify successful checkout
  await expect(page.locator('[data-test="complete-header"]'))
    .toHaveText('Thank you for your order!');
});
