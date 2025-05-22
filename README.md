# User Profile Form – Automated Tests

Hey there! 👋  
This repo contains a suite of automated tests I wrote using **Playwright** to validate the **user profile creation form**. It’s part of a QA assessment project.

You’ll find a detailed breakdown of the results and insights in the test report:  
📄 [Quality Assurance Test Report - Kevin Noutsawo](Quality%20Assurance%20Test%20Report%20-%20Kevin%20Noutsawo.md)  
📑 [PDF version](Quality%20Assurance%20Test%20Report%20-%20Kevin%20Noutsawo.pdf)

---

## 🔍 What’s This About?

These tests are designed to make sure the user profile form works as expected — from basic field validations to catching subtle UI issues. I’ve focused not just on functionality, but also on things that impact the overall user experience.

You can check out the live form here: [https://qa-ssessment.pages.dev](https://qa-ssessment.pages.dev)

---

## ✅ What’s Covered

Here’s what the test suite currently looks for:

### 1. **Mandatory Fields**
- Verifies that required fields are present and properly validated
- Tests missing inputs for first name, last name, and password

### 2. **Field Validations**
- Checks for special characters in names
- Invalid email formats
- Password mismatch handling
- Invalid LinkedIn URLs

### 3. **Optional Fields**
- Date of birth validations (including rejecting future dates)
- Valid and invalid phone numbers
- Gender selection options

### 4. **UI Defects**
- Exposure of sensitive data
- Typos in field labels
- Missing gender option
- Date format issues
- Placeholder and success message problems

---

## 🧱 Project Structure

The project follows the **Page Object Model (POM)** design pattern:

pages/
├─ BasePage.ts // Shared logic for pages
└─ UserProfileFormPage.ts // Page object for the form

fixtures/
└─ testData.ts // Valid and invalid input sets

tests/
├─ mandatory-fields.spec.ts
├─ field-validation.spec.ts
├─ optional-fields.spec.ts
└─ ui-defects.spec.ts

yaml
Copy
Edit

---

## 🛠 Prerequisites

Make sure you’ve got the following installed:

- **Node.js** (v18+)
- **npm** (v7+)

---

## 🚀 Getting Started

1. Clone the repo:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
Install the dependencies:

bash
Copy
Edit
npm install
Set up Playwright browsers:

bash
Copy
Edit
npx playwright install
🧪 Running the Tests
Run all tests:
bash
Copy
Edit
npm test
Run in headed mode (browser UI visible):
bash
Copy
Edit
npm run test:headed
Run in debug mode:
bash
Copy
Edit
npm run test:debug
Run in specific browsers:
bash
Copy
Edit
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Safari (WebKit)
npm run test:webkit
View test report:
bash
Copy
Edit
npm run test:report
⚠️ Known Issues & Bugs
Here are some things I discovered during testing:

LinkedIn field is incorrectly required — It’s supposed to be optional.

Wrong error message for last name — It shows a first name error instead.

Password validation bug — Displays “Passwords do not match” when the password is actually missing.

Date of birth format — Users can’t easily input dates in YYYY-MM-DD format, and future dates are wrongly accepted.

No success message — Nothing appears after successful form submission.

UI problems — Includes typos, missing gender options, and missing placeholders.

🛠 Workarounds
For known bugs, test expectations are adjusted to reflect current (even if incorrect) behavior.

LinkedIn field is always filled in tests, since the app currently requires it. This can be updated as soon as the issue is fixed.