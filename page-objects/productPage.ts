import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class ProductPage extends HelperBase {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productStock: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productName = page.getByTestId("product-name");
    this.productPrice = page.getByTestId("price").getByTestId("special-price");
    this.productStock = page.getByTestId("quantity-selector-stock");
  }

  async getProductPrice(): Promise<number> {
    const priceText = await this.productPrice.textContent();
    if (!priceText) {
      throw new Error("Price text content is empty");
    }
    const price = parseFloat(priceText.replace("$", "").trim());
    if (isNaN(price)) {
      throw new Error("Failed to parse price");
    }
    return price;
  }
}
