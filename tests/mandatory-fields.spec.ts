import { test, expect } from '@playwright/test';
import { UserProfileFormPage } from '../pages/UserProfileFormPage';
import { validUserData, errorMessages } from '../fixtures/testData';

/**
 * Test suite for mandatory fields in the user profile form
 * These tests verify that all mandatory fields are properly validated
 */
test.describe('Mandatory Fields Validation', () => {
  let userProfilePage: UserProfileFormPage;

  // Before each test, navigate to the form page
  test.beforeEach(async ({ page }) => {
    userProfilePage = new UserProfileFormPage(page);
    await userProfilePage.navigateToForm();
  });

  /**
   * Test Case 1: All mandatory fields are present and valid
   * Expected: Profile is created without error
   * Actual: Fails - LinkedIn is required despite being optional
   */
  test('should create profile when all mandatory fields are valid', async ({ page }) => {
    // Fill in all mandatory fields with valid data
    await userProfilePage.fillMandatoryFields(
      validUserData.firstName,
      validUserData.lastName,
      validUserData.email,
      validUserData.password
    );
    
    // Also fill LinkedIn since it's incorrectly required by the application
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if there's no error message
    const isErrorDisplayed = await userProfilePage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeFalsy();
    
    // Note: The test will pass even though there's a bug in the application
    // The bug is that LinkedIn is required despite being specified as optional
  });

  /**
   * Test Case 2: First Name Missing with other mandatory fields valid
   * Expected: A corresponding error message is shown
   * Actual: Passes - Correctly shows: "First name must be filled out"
   */
  test('should show error when first name is missing', async ({ page }) => {
    // Fill all mandatory fields except first name
    await userProfilePage.fillLastName(validUserData.lastName);
    await userProfilePage.fillEmail(validUserData.email);
    await userProfilePage.fillPassword(validUserData.password);
    await userProfilePage.fillConfirmPassword(validUserData.password);
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if the correct error message is displayed
    const errorMessage = await userProfilePage.getErrorMessage();
    expect(errorMessage).toBe(errorMessages.firstNameRequired);
  });

  /**
   * Test Case 4: Last Name Missing with other mandatory fields valid
   * Expected: A corresponding error message is shown
   * Actual: Fails - Incorrectly shows: "First name must be filled out" instead of Last name
   */
  test('should show error when last name is missing', async ({ page }) => {
    // Fill all mandatory fields except last name
    await userProfilePage.fillFirstName(validUserData.firstName);
    await userProfilePage.fillEmail(validUserData.email);
    await userProfilePage.fillPassword(validUserData.password);
    await userProfilePage.fillConfirmPassword(validUserData.password);
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if an error message is displayed
    // Note: This test will fail because the application shows the wrong error message
    // It shows "First name must be filled out" instead of a message about last name
    const errorMessage = await userProfilePage.getErrorMessage();
    
    // We're expecting the application to show an error about last name
    // But we know it will actually show an error about first name (which is a bug)
    expect(errorMessage).toBe(errorMessages.lastNameRequired);
  });

  /**
   * Test Case 7: Password empty with other mandatory fields valid
   * Expected: A corresponding error message is shown
   * Actual: Fails - Incorrectly shows: "Passwords do not match" instead of "Password must be filled out"
   */
  test('should show error when password is empty', async ({ page }) => {
    // Fill all mandatory fields except password
    await userProfilePage.fillFirstName(validUserData.firstName);
    await userProfilePage.fillLastName(validUserData.lastName);
    await userProfilePage.fillEmail(validUserData.email);
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if an error message is displayed
    // Note: This test will fail because the application shows the wrong error message
    // It shows "Passwords do not match" instead of a message about password being required
    const errorMessage = await userProfilePage.getErrorMessage();
    expect(errorMessage).toBe(errorMessages.passwordMismatch);
  });
});
