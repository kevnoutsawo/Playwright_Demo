import { test, expect } from '@playwright/test';
import { UserProfileFormPage } from '../pages/UserProfileFormPage';
import { validUserData, invalidUserData, errorMessages } from '../fixtures/testData';

/**
 * Test suite for field validation in the user profile form
 * These tests verify that input validation works correctly for all fields
 */
test.describe('Field Validation', () => {
  let userProfilePage: UserProfileFormPage;

  // Before each test, navigate to the form page
  test.beforeEach(async ({ page }) => {
    userProfilePage = new UserProfileFormPage(page);
    await userProfilePage.navigateToForm();
  });

  /**
   * Test Case 3: First Name contains non-alphabetical characters
   * Expected: A corresponding error message is shown
   * Actual: Passes - Correctly shows: "First name must contain alphabetical characters only"
   */
  test('should show error when first name contains non-alphabetical characters', async ({ page }) => {
    // Fill first name with invalid data (contains numbers)
    await userProfilePage.fillFirstName(invalidUserData.firstNameWithNumbers);
    
    // Fill other mandatory fields with valid data
    await userProfilePage.fillLastName(validUserData.lastName);
    await userProfilePage.fillEmail(validUserData.email);
    await userProfilePage.fillPassword(validUserData.password);
    await userProfilePage.fillConfirmPassword(validUserData.password);
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if the correct error message is displayed
    const errorMessage = await userProfilePage.getErrorMessage();
    expect(errorMessage).toBe(errorMessages.firstNameAlphabetical);
  });

  /**
   * Test Case 5: Last Name contains non-alphabetical characters
   * Expected: A corresponding error message is shown
   * Actual: Passes - Correctly shows: "Last name must contain alphabetical characters only"
   */
  test('should show error when last name contains non-alphabetical characters', async ({ page }) => {
    // Fill last name with invalid data (contains symbols)
    await userProfilePage.fillFirstName(validUserData.firstName);
    await userProfilePage.fillLastName(invalidUserData.lastNameWithSymbols);
    await userProfilePage.fillEmail(validUserData.email);
    await userProfilePage.fillPassword(validUserData.password);
    await userProfilePage.fillConfirmPassword(validUserData.password);
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if the correct error message is displayed
    const errorMessage = await userProfilePage.getErrorMessage();
    expect(errorMessage).toBe(errorMessages.lastNameAlphabetical);
  });

  /**
   * Test Case 6: Email format invalid
   * Expected: A corresponding error message is shown
   * Actual: Passes - Correctly shows: "Email must be a valid email address"
   */
  test('should show error when email format is invalid', async ({ page }) => {
    // Fill email with invalid format
    await userProfilePage.fillFirstName(validUserData.firstName);
    await userProfilePage.fillLastName(validUserData.lastName);
    await userProfilePage.fillEmail(invalidUserData.invalidEmail);
    await userProfilePage.fillPassword(validUserData.password);
    await userProfilePage.fillConfirmPassword(validUserData.password);
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if the correct error message is displayed
    const errorMessage = await userProfilePage.getErrorMessage();
    expect(errorMessage).toBe(errorMessages.emailInvalid);
  });

  /**
   * Test Case 8: Password and Confirm are different
   * Expected: A corresponding error message is shown
   * Actual: Passes - Correctly shows: "Passwords do not match"
   */
  test('should show error when passwords do not match', async ({ page }) => {
    // Fill password and confirm password with different values
    await userProfilePage.fillFirstName(validUserData.firstName);
    await userProfilePage.fillLastName(validUserData.lastName);
    await userProfilePage.fillEmail(validUserData.email);
    await userProfilePage.fillPassword(validUserData.password);
    await userProfilePage.fillConfirmPassword(invalidUserData.differentPassword);
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if the correct error message is displayed
    const errorMessage = await userProfilePage.getErrorMessage();
    expect(errorMessage).toBe(errorMessages.passwordMismatch);
  });

  /**
   * Test Case 12: LinkedIn or Github URL invalid
   * Expected: A corresponding error message is shown
   * Actual: Passes - An appropriate message is displayed
   */
  test('should show error when LinkedIn URL is invalid', async ({ page }) => {
    // Fill LinkedIn URL with invalid format
    await userProfilePage.fillFirstName(validUserData.firstName);
    await userProfilePage.fillLastName(validUserData.lastName);
    await userProfilePage.fillEmail(validUserData.email);
    await userProfilePage.fillPassword(validUserData.password);
    await userProfilePage.fillConfirmPassword(validUserData.password);
    await userProfilePage.fillLinkedinUrl(invalidUserData.invalidLinkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if an error message is displayed
    const isErrorDisplayed = await userProfilePage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });
});
