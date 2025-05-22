**Quality Assurance Test Report**

**Project:** User Profile Form  
**Scope:** Manual Test Cases and Bug Defect Report  
**Objective:** Validate form behavior and error handling under various input scenarios.  
**Author**: Kevin Noutsawo

- Test Cases:

| Test Case Number | Description | Expected Result | Status | Comment |
| :---- | :---- | :---- | :---- | :---- |
| 1 | All mandatory fields are present and valid | Profile is created without error | Fails | LinkedIn is required from the user despite being optional |
| 2 | First Name Missing with other mandatory fields valid | A corresponding error message is shown | Passes | Correctly shows : “First name must be filled out” |
| 3 | First Name contains non-alphabetical characters | A corresponding error message is shown | Passes | Correctly shows: “First name must contain alphabetical characters only” |
| 4 | Last Name Missing with other mandatory fields valid | A corresponding error message is shown | Fails | Incorrectly shows : “First name must be filled out” instead of Last name which is confusing for the user |
| 5 | Last Name contains non-alphabetical characters with other mandatory fields valid | A corresponding error message is shown | Passes | Correctly shows: “Last name must contain alphabetical characters only” |
| 6 | Email format invalid with other mandatory fields valid | A corresponding error message is shown | Passes | Correctly shows: “Email must be a valid email address” |
| 7 | Password empty with other mandatory fields valid | A corresponding error message is shown | Fails | Incorrectly shows: “Passwords do not match” instead of something like “Password must be filled out” |
| 8 | Password and Confirm are differents | A corresponding error message is shown | Passes | Correctly shows : “Passwords do not match” |
| 9 | Valid, coherent and well formatted (YYYY-MM-DD) date is entered with other mandatory fields valid | The date is accepted and form submits | Fails | User has no way to enter the right format. Also, future dates are accepted which is incoherent for a date of birth |
| 10 | Phone number is valid with other mandatory fields valid | The number is accepted | Passes |  |
| 11 | Phone number is invalid with other mandatory fields valid | A corresponding error message is shown | Passes | An appropriate message is displayed according to the anomaly |
| 12 | LinkedIn or Github url invalid | A corresponding error message is shown | Passes | An appropriate message is displayed  |

- Bug and UX Defect Report

| Bug number | Description | Steps to Reproduce | Expected Behavior | Actual Behavior | Severity |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | Sensitive text hidden : “admin123 \- You should not see this” | Inspect the HTML code of the page | sensitive data should be inaccessible to users | Data is only visually hidden via CSS which is insufficient for bots and tech savvy malicious visitors | High |
| 2 | Address field label has typo “optioal” | Check Address field label | “Address (optional)” spelled  | Label reads “Address (optioal)” | Low |
| 3 | “Date ofBirth” label is missing a space | Check Date of Birth label | “Date of Birth (optional)” properly spaced | Label reads “Date ofBirth (optional)” | Low |
| 4 | Gender option “Non-binary” is missing | Check Gender field | Options “Male”, “Female”, “Non-binary”, and “Prefer not to say | Only “Male”, “Female”, “Prefer not to say” are present; “Non-binary” missing | Medium |
| 5 | Date input has wrong format | Check Date of Birth field | Field should take the date in the expected format directly | User can’t enter date in the right format  | Medium |
| 6 | Missing hints and placeholders for most field | Load form and check input fields | There should be placeholders to hint the user in the direction of expected data | No placeholders are present except for date | Low |
| 7 | Missing success message | Fill up the form with valid data and submit it | The success message should be displayed at least long enough for the user to comfortably read it | The page reloads without any indication of what happened which is confusing for the user | Low |

