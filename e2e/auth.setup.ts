import { test as setup} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import dataset from "../utils/testData.json";

const authFile = '.auth/user.json'

setup('Authentication', async({page}) => {
    const pm = new PageManager(page)

    await page.goto('/');
    await pm.onHomePage().clickOnLoginIcon() // or just with locator
    await pm.onLoginAndSignUpPage().fillLoginFormAndSubmit(dataset.credentials.email, dataset.credentials.password)
    await page.waitForURL('https://demo-next-sap-b2b-coveo.alokai.com/my-account/personal-data')

    await page.context().storageState({path: authFile})
})