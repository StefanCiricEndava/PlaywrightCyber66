import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import dataset from "../utils/testData.json";

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Alokai e2e test', async ({ page }) => {
  const pm = new PageManager(page)

  // On home page, search for items by category/name/brand

  await pm.onHomePage().searchingForItems(dataset.product3.category)
  await expect(page).toHaveURL('\/search?search=' + dataset.product3.category)
  await expect(pm.onHomePage().searchResults).toContainText(dataset.product3.category)

  // On filter section, for Brands, select product's brand 
  await pm.onHomePage().filterItemsByBrand(dataset.product3.brand)
  
  // Assertation for previous product's brand selection
  await expect(page.locator(`details[data-testid="accordion-item"] div label span input[value="${dataset.product3.brand}"]`)).toBeChecked()

  // On previous searched and filtered page, select your product 
  await pm.onHomePage().clickOnSpecificProduct(dataset.product3.name, dataset.product3.sku)
  await page.waitForLoadState('networkidle')
  
  // Assertation on product page to be sure that we selected right product
  await expect(page.url()).toContain(`${dataset.product3.sku}?sku=${dataset.product3.sku}`);
  await expect(pm.onProductPage().productName).toHaveText(dataset.product3.name)
  await expect(pm.onProductPage().productPrice).toHaveText(`$${(dataset.product3.price).toString()}.00`)

  // On product page, add product to the cart
  await pm.onProductPage().clickOnAddToCartButton()

  //Assertation for adding product to cart
  await expect(pm.onProductPage().notifications).toBeVisible()
  await expect(pm.onProductPage().notifications).toContainText('Product has been added to the cart.')

  // Click on cart Icon
  await pm.onHomePage().clickOnCartIcon()
  await page.waitForLoadState('networkidle')

  //Assertation to check that correct product is in cart
  await expect(pm.onCartPage().productTitle).toContainText(dataset.product3.name)
  await expect(pm.onCartPage().productPrice).toHaveText(`$${(dataset.product3.price).toString()}.00`)
  await expect(pm.onCartPage().productQuantity).toHaveValue('1')

  //Icrease product quantity and check is the quantity and prace are correct
  await pm.onCartPage().waitForNumberOfSeconds(3)
  await pm.onCartPage().increaseProductQuantity()

  await expect(pm.onCartPage().notifications).toBeVisible()
  await expect(pm.onCartPage().notifications).toContainText('Cart updated.')
  await expect(pm.onCartPage().productQuantity).toHaveValue('2')
  await expect(pm.onCartPage().productTotal).toHaveText(`$${(dataset.product3.price*2).toString()}.00`)

  await page.getByTestId('cart-product-card-remove-btn').click()
});

