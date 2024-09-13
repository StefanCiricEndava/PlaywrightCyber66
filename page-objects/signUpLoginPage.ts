import { Locator, Page } from "@playwright/test"

export class SignUpLoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByTestId("email-input");
    this.password = page.getByTestId("password-input");
    this.submitButton = page.getByTestId("submit-button");
  }

  /**
   * This method should fill email and password and submit it
   * @param email
   * @param password
   */
  async fillLoginFormAndSubmit(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }

}
