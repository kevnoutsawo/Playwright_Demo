import { test, expect } from '@playwright/test';
import { UserProfileFormPage } from '../pages/UserProfileFormPage';
import { validUserData, invalidUserData } from '../fixtures/testData';

/**
 * Test suite for optional fields in the user profile form
 * These tests verify that optional fields are properly handled
 */
test.describe('Optional Fields', () => {
  let userProfilePage: UserProfileFormPage;

  // Before each test, navigate to the form page
  test.beforeEach(async ({ page }) => {
    userProfilePage = new UserProfileFormPage(page);
    await userProfilePage.navigateToForm();
  });

  /**
   * Test Case 9: Valid date of birth is entered
   * Expected: The date is accepted and form submits
   * Actual: Fails - User has no way to enter the right format. Future dates are accepted.
   */
  test('should accept valid date of birth', async ({ page }) => {
    // Fill all mandatory fields
    await userProfilePage.fillMandatoryFields(
      validUserData.firstName,
      validUserData.lastName,
      validUserData.email,
      validUserData.password
    );
    
    // Fill date of birth with valid past date
    await userProfilePage.fillDateOfBirth(validUserData.dateOfBirth);
    
    // Fill LinkedIn since it's incorrectly required
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if there's no error message
    const isErrorDisplayed = await userProfilePage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeFalsy();
    
    // Note: This test will pass even though there's a UX issue with the date field
    // The issue is that users can't easily enter the date in the required format
  });

  /**
   * Test Case 9 (negative): Future date of birth is entered
   * Expected: An error message should be shown
   * Actual: Fails - Future dates are accepted which is incoherent for a date of birth
   */
  test('should reject future date of birth', async ({ page }) => {
    // Fill all mandatory fields
    await userProfilePage.fillMandatoryFields(
      validUserData.firstName,
      validUserData.lastName,
      validUserData.email,
      validUserData.password
    );
    
    // Fill date of birth with future date
    await userProfilePage.fillDateOfBirth(invalidUserData.futureDateOfBirth);
    
    // Fill LinkedIn since it's incorrectly required
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if there's an error message
    // Note: This test will fail because the application accepts future dates
    const isErrorDisplayed = await userProfilePage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  /**
   * Test Case 10: Phone number is valid
   * Expected: The number is accepted
   * Actual: Passes
   */
  test('should accept valid phone number', async ({ page }) => {
    // Fill all mandatory fields
    await userProfilePage.fillMandatoryFields(
      validUserData.firstName,
      validUserData.lastName,
      validUserData.email,
      validUserData.password
    );
    
    // Fill phone number with valid data
    await userProfilePage.fillPhoneNumber(validUserData.phoneNumber);
    
    // Fill LinkedIn since it's incorrectly required
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if there's no error message
    const isErrorDisplayed = await userProfilePage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeFalsy();
  });

  /**
   * Test Case 11: Phone number is invalid (too long)
   * Expected: A corresponding error message is shown
   * Actual: Passes - An appropriate message is displayed
   */
  test('should show error when phone number is too long', async ({ page }) => {
    // Fill all mandatory fields
    await userProfilePage.fillMandatoryFields(
      validUserData.firstName,
      validUserData.lastName,
      validUserData.email,
      validUserData.password
    );
    
    // Fill phone number with invalid data (too long)
    await userProfilePage.fillPhoneNumber(invalidUserData.invalidPhoneNumberTooLong);
    
    // Fill LinkedIn since it's incorrectly required
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if there's an error message
    const isErrorDisplayed = await userProfilePage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  /**
   * Test Case 11: Phone number is invalid (contains letters)
   * Expected: A corresponding error message is shown
   * Actual: Passes - An appropriate message is displayed
   */
  test('should show error when phone number contains letters', async ({ page }) => {
    // Fill all mandatory fields
    await userProfilePage.fillMandatoryFields(
      validUserData.firstName,
      validUserData.lastName,
      validUserData.email,
      validUserData.password
    );
    
    // Fill phone number with invalid data (contains letters)
    await userProfilePage.fillPhoneNumber(invalidUserData.invalidPhoneNumberWithLetters);
    
    // Fill LinkedIn since it's incorrectly required
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if there's an error message
    const isErrorDisplayed = await userProfilePage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  /**
   * Test for Gender selection
   * Expected: The gender is accepted
   * Actual: Passes
   * Note: This test is not explicitly mentioned in the test cases but is important for coverage
   */
  test('should accept gender selection', async ({ page }) => {
    // Fill all mandatory fields
    await userProfilePage.fillMandatoryFields(
      validUserData.firstName,
      validUserData.lastName,
      validUserData.email,
      validUserData.password
    );
    
    // Select gender
    await userProfilePage.selectGender(validUserData.gender);
    
    // Fill LinkedIn since it's incorrectly required
    await userProfilePage.fillLinkedinUrl(validUserData.linkedinUrl);
    
    // Submit the form
    await userProfilePage.submitForm();
    
    // Check if there's no error message
    const isErrorDisplayed = await userProfilePage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeFalsy();
  });
});
