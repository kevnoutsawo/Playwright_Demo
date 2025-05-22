import { test, expect } from '@playwright/test';
import { UserProfileFormPage } from '../pages/UserProfileFormPage';
import { validUserData } from '../fixtures/testData';

/**
 * Test suite for UI defects in the user profile form
 * These tests verify the UI defects mentioned in the bug report
 */
test.describe('UI Defects', () => {
  let userProfilePage: UserProfileFormPage;

  // Before each test, navigate to the form page
  test.beforeEach(async ({ page }) => {
    userProfilePage = new UserProfileFormPage(page);
    await userProfilePage.navigateToForm();
  });

  /**
   * Bug 1: Sensitive text hidden: "admin123 - You should not see this"
   * Expected: Sensitive data should be inaccessible to users
   * Actual: Data is only visually hidden via CSS which is insufficient
   */
  test('should not expose sensitive data in HTML', async ({ page }) => {
    // Check if the sensitive text is present in the page source
    const pageContent = await page.content();
    
    // This test will fail because the sensitive data is present in the HTML
    expect(pageContent).not.toContain('admin123 - You should not see this');
  });

  /**
   * Bug 2: Address field label has typo "optioal"
   * Expected: "Address (optional)" spelled correctly
   * Actual: Label reads "Address (optioal)"
   */
  test('should have correct spelling for Address label', async ({ page }) => {
    // Get the label text for the address field
    const addressLabel = await page.locator('label[for="address"]').innerText();
    
    // This test will fail because the label has a typo
    expect(addressLabel).toBe('Address (optional)');
  });

  /**
   * Bug 3: "Date ofBirth" label is missing a space
   * Expected: "Date of Birth (optional)" properly spaced
   * Actual: Label reads "Date ofBirth (optional)"
   */
  test('should have correct spacing in Date of Birth label', async ({ page }) => {
    // Get the label text for the date of birth field
    const dobLabel = await page.locator('label[for="dob"]').innerText();
    
    // This test will fail because the label has incorrect spacing
    expect(dobLabel).toBe('Date of Birth (optional)');
  });

  /**
   * Bug 4: Gender option "Non-binary" is missing
   * Expected: Options "Male", "Female", "Non-binary", and "Prefer not to say"
   * Actual: Only "Male", "Female", "Prefer not to say" are present; "Non-binary" missing
   */
  test('should have Non-binary option in Gender field', async ({ page }) => {
    // Check if the Non-binary option exists
    const nonBinaryOption = await page.locator('input[name="gender"][value="non-binary"]').count();
    
    // This test will fail because the Non-binary option is missing
    expect(nonBinaryOption).toBe(1);
  });

  /**
   * Bug 5: Date input has wrong format
   * Expected: Field should take the date in the expected format directly
   * Actual: User can't enter date in the right format
   */
  test('should allow entering date in YYYY-MM-DD format', async ({ page }) => {
    // Try to enter a date in the required format
    await userProfilePage.fillDateOfBirth('1990-01-01');
    
    // Get the value of the date field
    const dateValue = await page.locator('#dob').inputValue();
    
    // This test might fail depending on how the date field is implemented
    expect(dateValue).toBe('1990-01-01');
  });

  /**
   * Bug 6: Missing hints and placeholders for most fields
   * Expected: There should be placeholders to hint the user
   * Actual: No placeholders are present except for date
   */
  test('should have placeholders for input fields', async ({ page }) => {
    // Check if the first name field has a placeholder
    const firstNamePlaceholder = await page.locator('#firstName').getAttribute('placeholder');
    
    // This test will fail because there's no placeholder
    expect(firstNamePlaceholder).not.toBeNull();
  });

  /**
   * Bug 7: Missing success message
   * Expected: The success message should be displayed
   * Actual: The page reloads without any indication of what happened
   */
  test('should show success message after form submission', async ({ page }) => {
    // Fill all required fields
    await userProfilePage.fillMandatoryFields(
      validUserData.firstName,
      validUserData.lastName,
      validUserData.email,
      validUserData.password
    );
    
    // Fill LinkedIn since it's incorrectly required
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if a success message is displayed
    // This test will fail because there's no success message
    const successMessage = await page.locator('.success-message').count();
    expect(successMessage).toBe(1);
  });
});
