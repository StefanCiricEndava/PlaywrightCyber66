import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class CartPage extends HelperBase {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly increaseButton: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productTotal: Locator;
  readonly productQuantity: Locator;
  readonly productRemoveButton: Locator;
  readonly orderSummaryTotalItems: Locator;
  readonly orderSummaryTotalPrice: Locator;
  readonly goToCheckout: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.cartIcon = page.getByTestId("cart-action");
    this.increaseButton = page.getByTestId("quantity-selector-increase-button");
    this.productTitle = page.getByTestId("cart-product-card-title");
    this.productPrice = page.getByTestId("cart-product-card-price").getByTestId("special-price");
    this.productTotal = page.getByTestId("cart-product-card-total");
    this.productQuantity = page.getByTestId("quantity-selector-input");
    this.productRemoveButton = page.getByTestId("cart-product-card-remove-btn");
    this.orderSummaryTotalItems = page.getByTestId("total-in-cart");
    this.orderSummaryTotalPrice = page.getByTestId("total");
    this.goToCheckout = page.getByTestId("go-to-checkout");
  }

  async removeProduct() {
    await this.productRemoveButton.click();
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

  async getProductQty(): Promise<number> {
    const qtyText = await this.productQuantity.inputValue();
    if (!qtyText) {
      throw new Error("Quantity text content is empty");
    }
    const quantity = parseFloat(qtyText.trim());
    if (isNaN(quantity)) {
      throw new Error("Failed to parse quantity");
    }
    return quantity;
  }

  async getTotalPrice(): Promise<number> {
    const priceText = await this.orderSummaryTotalPrice.textContent();
    if (!priceText) {
      throw new Error("Price text content is empty");
    }
    const cleanedPriceText = priceText.replace(/[$,]/g, "").trim();
    const price = parseFloat(cleanedPriceText);
    if (isNaN(price)) {
      throw new Error("Failed to parse price");
    }
    return price;
  }
}
