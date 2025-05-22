import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * UserProfileFormPage class that contains methods specific to the user profile form
 * This page object represents the user profile creation form
 */
export class UserProfileFormPage extends BasePage {
  // URL of the application
  private readonly url = '/';

  // Form field selectors
  private readonly firstNameSelector = '#firstName';
  private readonly lastNameSelector = '#lastName';
  private readonly emailSelector = '#email';
  private readonly passwordSelector = '#password';
  private readonly confirmPasswordSelector = '#confirmPassword';
  private readonly genderSelector = 'input[name="gender"]';
  private readonly dateOfBirthSelector = '#dob';
  private readonly phoneNumberSelector = '#phone';
  private readonly addressSelector = '#address';
  private readonly linkedinUrlSelector = '#linkedin';
  private readonly githubUrlSelector = '#github';
  private readonly submitButtonSelector = 'button[type="submit"]';
  private readonly errorMessageSelector = '.error-message';

  /**
   * Constructor for the UserProfileFormPage class
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the user profile form page
   */
  async navigateToForm(): Promise<void> {
    await this.navigate(this.url);
  }

  /**
   * Fill the first name field
   * @param firstName - First name to fill
   */
  async fillFirstName(firstName: string): Promise<void> {
    await this.fillField(this.firstNameSelector, firstName);
  }

  /**
   * Fill the last name field
   * @param lastName - Last name to fill
   */
  async fillLastName(lastName: string): Promise<void> {
    await this.fillField(this.lastNameSelector, lastName);
  }

  /**
   * Fill the email field
   * @param email - Email to fill
   */
  async fillEmail(email: string): Promise<void> {
    await this.fillField(this.emailSelector, email);
  }

  /**
   * Fill the password field
   * @param password - Password to fill
   */
  async fillPassword(password: string): Promise<void> {
    await this.fillField(this.passwordSelector, password);
  }

  /**
   * Fill the confirm password field
   * @param confirmPassword - Confirm password to fill
   */
  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.fillField(this.confirmPasswordSelector, confirmPassword);
  }

  /**
   * Select a gender option
   * @param gender - Gender to select (male, female, or prefer-not-to-say)
   */
  async selectGender(gender: string): Promise<void> {
    await this.page.locator(`${this.genderSelector}[value="${gender}"]`).check();
  }

  /**
   * Fill the date of birth field
   * @param dateOfBirth - Date of birth to fill in YYYY-MM-DD format
   */
  async fillDateOfBirth(dateOfBirth: string): Promise<void> {
    await this.fillField(this.dateOfBirthSelector, dateOfBirth);
  }

  /**
   * Fill the phone number field
   * @param phoneNumber - Phone number to fill
   */
  async fillPhoneNumber(phoneNumber: string): Promise<void> {
    await this.fillField(this.phoneNumberSelector, phoneNumber);
  }

  /**
   * Fill the address field
   * @param address - Address to fill
   */
  async fillAddress(address: string): Promise<void> {
    await this.fillField(this.addressSelector, address);
  }

  /**
   * Fill the LinkedIn URL field
   * @param linkedinUrl - LinkedIn URL to fill
   */
  async fillLinkedinUrl(linkedinUrl: string): Promise<void> {
    await this.fillField(this.linkedinUrlSelector, linkedinUrl);
  }

  /**
   * Fill the GitHub URL field
   * @param githubUrl - GitHub URL to fill
   */
  async fillGithubUrl(githubUrl: string): Promise<void> {
    await this.fillField(this.githubUrlSelector, githubUrl);
  }

  /**
   * Submit the form
   */
  async submitForm(): Promise<void> {
    await this.clickElement(this.submitButtonSelector);
  }

  /**
   * Get the error message text
   * @returns Error message text
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.errorMessageSelector);
    return await this.getElementText(this.errorMessageSelector);
  }

  /**
   * Check if an error message is displayed
   * @returns True if an error message is displayed, false otherwise
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessageSelector);
  }

  /**
   * Fill all mandatory fields with valid data
   * @param firstName - First name
   * @param lastName - Last name
   * @param email - Email
   * @param password - Password
   */
  async fillMandatoryFields(firstName: string, lastName: string, email: string, password: string): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
  }

  /**
   * Fill all fields (mandatory and optional) with valid data
   * @param userData - Object containing all user data
   */
  async fillAllFields(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    address?: string;
    linkedinUrl?: string;
    githubUrl?: string;
  }): Promise<void> {
    await this.fillMandatoryFields(userData.firstName, userData.lastName, userData.email, userData.password);

    if (userData.gender) {
      await this.selectGender(userData.gender);
    }

    if (userData.dateOfBirth) {
      await this.fillDateOfBirth(userData.dateOfBirth);
    }

    if (userData.phoneNumber) {
      await this.fillPhoneNumber(userData.phoneNumber);
    }

    if (userData.address) {
      await this.fillAddress(userData.address);
    }

    if (userData.linkedinUrl) {
      await this.fillLinkedinUrl(userData.linkedinUrl);
    }

    if (userData.githubUrl) {
      await this.fillGithubUrl(userData.githubUrl);
    }
  }
}
