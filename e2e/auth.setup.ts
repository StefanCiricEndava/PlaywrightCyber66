import { faker } from '@faker-js/faker';
import { test, expect } from '../fixtures/PageObjectFixture'

const authFile = ".auth/user.json";

test("Authentication", async ({ page, context, homePage, signUpLoginPage }) => {

  faker.seed(12);
  const email = faker.internet.email().toLowerCase()
  const password = faker.internet.password()+'!'

  await homePage.clickOnLoginIcon(); 
  await signUpLoginPage.fillLoginFormAndSubmit(email,password);
  await page.waitForURL("https://demo-next-sap-b2b-coveo.alokai.com/my-account/personal-data");

  await page.context().storageState({ path: authFile });
});
