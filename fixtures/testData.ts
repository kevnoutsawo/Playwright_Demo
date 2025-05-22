/**
 * Test data for user profile form tests
 * Contains valid and invalid data for different test scenarios
 */

// Valid user data
export const validUserData = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@example.com',
  password: 'P@ssw0rd123',
  gender: 'male',
  dateOfBirth: '1990-01-01',
  phoneNumber: '1234567890',
  address: '123 Main St, Apt 1',
  linkedinUrl: 'https://www.linkedin.com/in/johnsmith',
  githubUrl: 'https://github.com/johnsmith'
};

// Invalid user data for different test cases
export const invalidUserData = {
  // First name with non-alphabetical characters
  firstNameWithNumbers: '123John',
  
  // Last name with non-alphabetical characters
  lastNameWithSymbols: 'Smith@#',
  
  // Invalid email formats
  invalidEmail: 'john.smith@',
  
  // Different password for confirmation
  differentPassword: 'DifferentP@ss123',
  
  // Future date of birth
  futureDateOfBirth: '2050-01-01',
  
  // Invalid phone number (too long)
  invalidPhoneNumberTooLong: '12345678901',
  
  // Invalid phone number (with letters)
  invalidPhoneNumberWithLetters: '123abc4567',
  
  // Invalid LinkedIn URL
  invalidLinkedinUrl: 'linkedin.com/johnsmith',
  
  // Invalid GitHub URL
  invalidGithubUrl: 'github.com/johnsmith'
};

// Error messages expected from the application
export const errorMessages = {
  firstNameRequired: 'First name must be filled out',
  firstNameAlphabetical: 'First name must contain alphabetical characters only',
  lastNameRequired: 'First name must be filled out', // This is a bug in the application
  lastNameAlphabetical: 'Last name must contain alphabetical characters only',
  emailInvalid: 'Email must be a valid email address',
  passwordMismatch: 'Passwords do not match',
  linkedinRequired: 'LinkedIn URL is required', // This is a bug as LinkedIn should be optional
};
