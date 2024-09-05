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
  readonly orderSummaryTotalItems: Locator;
  readonly orderSummaryTotalPrice: Locator;
  readonly goToCheckout: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.cartIcon = page.getByTestId("cart-action");
    this.increaseButton = page.getByTestId("quantity-selector-increase-button");
    this.productTitle = page.getByTestId("cart-product-card-title");
    this.productPrice = page
      .getByTestId("cart-product-card-price")
      .getByTestId("special-price");
    this.productTotal = page.getByTestId("cart-product-card-total");
    this.productQuantity = page.getByTestId("quantity-selector-input");
    this.orderSummaryTotalItems = page.getByTestId("total-in-cart");
    this.orderSummaryTotalPrice = page.getByTestId("total");
    this.goToCheckout = page.getByTestId("go-to-checkout");
  }
}
