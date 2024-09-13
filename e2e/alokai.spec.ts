import { test, expect } from '../fixtures/PageObjectFixture'
import { readCSV } from '../utils/csvReader';

test("Alokai e2e test", async ({ page, homePage, cartPage, productPage }) => {
  
  const dataArray = await readCSV('./ProductList.csv');
  const productCategory = dataArray[3].category;
  const productBrand = dataArray[3].brand
  const productPrice = dataArray[3].price
  const productName = dataArray[3].name
  const productSku = dataArray[3].sku

  // On home page, search for items by category/name/brand
  await homePage.searchingForItems(productCategory);
  await expect(page).toHaveURL("/search?search=" + productCategory);
  await expect(homePage.searchResults).toContainText(productCategory);

  // On filter section, for Brands, select product's brand
  await homePage.filterItemsByBrand(productBrand);

  // Assertation for previous product's brand selection
  await expect(page.locator(`details[data-testid="accordion-item"] div label span input[value="${productBrand}"]`)).toBeChecked();

  // On previous searched and filtered page, select your product
  await homePage.clickOnSpecificProduct(productName,productSku);

  // Assertation on product page to be sure that we selected right product
  await expect(page.url()).toContain(`${productSku}?sku=${productSku}`);
  await expect(productPage.productName).toHaveText(productName);
  await expect(productPage.productPrice).toHaveText(`$${productPrice.toString()}`);

  // On product page, add product to the cart
  await productPage.clickOnAddToCartButton();

  // Assertation for adding product to cart
  await expect(productPage.notifications).toBeVisible();
  await expect(productPage.notifications).toContainText("Product has been added to the cart.");

  // Click on cart Icon
  await homePage.clickOnCartIcon();

  // Assertation to check that correct product is in cart
  await expect(cartPage.productTitle).toContainText(productName);
  await expect(cartPage.productPrice).toHaveText(`$${productPrice.toString()}`);
  await expect(cartPage.productQuantity).toHaveValue("1");

  // Icrease product quantity and check is the quantity and prace are correct
  await cartPage.increaseProductQuantity();

  // Assertation after increasing quantity and cart update 
  await expect(cartPage.notifications).toBeVisible();
  await expect(cartPage.notifications).toContainText("Cart updated.");
  await expect(cartPage.productQuantity).toHaveValue("2");
  await expect(cartPage.productTotal).toContainText(`$${(productPrice * 2).toString()}`);

  // Removing previous selected product
  await cartPage.removeProduct()
  await expect(cartPage.notifications).toContainText("Cart updated.");
});
