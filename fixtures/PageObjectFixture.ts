import { test as base } from '@playwright/test';
import { MainPage } from "../page-objects/mainPage";
import { SignUpLoginPage } from "../page-objects/signUpLoginPage";
import { CartPage } from "../page-objects/cartPage";
import { ProductPage } from "../page-objects/productPage";

type MyFixtures = {
    homePage: MainPage;
    signUpLoginPage: SignUpLoginPage;
    cartPage: CartPage;
    productPage: ProductPage;
};
  
export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
      const homePage = new MainPage(page);
      await page.goto('/');
      await use(homePage);
    },
  
    signUpLoginPage: async ({ page }, use) => {
      await use(new SignUpLoginPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
      },
  });
  export { expect } from '@playwright/test';