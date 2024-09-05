import { Locator, Page } from "@playwright/test";

export class MainPage {
  readonly page: Page;
  readonly loginIcon: Locator;
  readonly searchField: Locator;
  readonly searchIcon: Locator;
  readonly logoIcon: Locator;
  readonly cartIcon: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginIcon = page.getByTestId("account-action");
    this.searchField = page.getByTestId("input-field");
    this.searchIcon = page.getByTestId("search-submit");
    this.logoIcon = page.getByTestId("logo-link");
    this.cartIcon = page.getByTestId("cart-action");
    this.searchResults = page.getByTestId("category-title");
  }

  async clickOnLoginIcon() {
    await this.loginIcon.click();
  }

  async clickOnCartIcon() {
    await this.cartIcon.click();
  }

  async searchingForItems(category: string) {
    await this.searchField.fill(category);
    await this.searchField.press("Enter");
  }

  async filterItemsByBrand(brand: string) {
    const filterCheckbox = this.page.locator(`details[data-testid="accordion-item"] div label span input[value="${brand}"]`);
    await filterCheckbox.click();
  }

  async clickOnSpecificProduct(productName: String, productSku: Number) {
    await this.page.waitForTimeout(4000);
    let listOfProducts = await this.page.getByTestId("product-card-vertical").count();

    for (let index = 0; index < listOfProducts; index++) {
      const itemName = await this.page.locator('div[data-testid="product-card-vertical"] div a[data-testid="link"]').nth(index).textContent();
      if (itemName === productName) {
        await this.page.getByTestId("product-card-vertical").nth(index).waitFor();
        await this.page.getByTestId("product-card-vertical").nth(index).click({ force: true });
        await this.page.waitForTimeout(3000);

        break;
      }
    }
  }
}
