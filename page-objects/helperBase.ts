import { Locator, Page } from "@playwright/test";

export class HelperBase {
  readonly page: Page;
  readonly increaseQuantityButton: Locator;
  readonly addToCartButton: Locator;
  readonly productPrice: Locator;
  readonly orderSummaryTotalItems: Locator;
  readonly orderSummaryTotalPrice: Locator;
  readonly notifications: Locator;

  constructor(page: Page) {
    this.page = page;
    this.increaseQuantityButton = page.getByTestId(
      "quantity-selector-increase-button"
    );
    this.addToCartButton = page.getByTestId("add-to-cart-button");
    this.productPrice = page.getByTestId("price").getByTestId("special-price");
    this.orderSummaryTotalItems = page.getByTestId("total-in-cart");
    this.orderSummaryTotalPrice = page.getByTestId("total");
    this.notifications = page.getByTestId("alert-body");
  }

  async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }

  async clickOnAddToCartButton() {
    await this.addToCartButton.click();
  }

  async increaseProductQuantity() {
    await this.increaseQuantityButton.click();
  }
}
