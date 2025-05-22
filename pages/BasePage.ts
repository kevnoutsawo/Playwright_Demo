import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage class that contains common methods for all page objects
 * This serves as a foundation for other page objects to inherit from
 */
export class BasePage {
  readonly page: Page;
  
  /**
   * Constructor for the BasePage class
   * @param page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - URL to navigate to
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get a locator for an element
   * @param selector - CSS or XPath selector
   * @returns Locator for the element
   */
  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Wait for an element to be visible
   * @param selector - CSS or XPath selector
   * @param timeout - Timeout in milliseconds
   */
  async waitForElement(selector: string, timeout = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if an element is visible
   * @param selector - CSS or XPath selector
   * @returns True if the element is visible, false otherwise
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Get text from an element
   * @param selector - CSS or XPath selector
   * @returns Text content of the element
   */
  async getElementText(selector: string): Promise<string> {
    return await this.page.locator(selector).innerText();
  }

  /**
   * Fill a form field
   * @param selector - CSS or XPath selector
   * @param value - Value to fill
   */
  async fillField(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Click on an element
   * @param selector - CSS or XPath selector
   */
  async clickElement(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }
}
