// import { test as base } from '@playwright/test';
// import { MainPage } from '../page-objects/MainPage';
// import { SignUpLoginPage } from '../page-objects/SignUpLoginPage';

// export const test = base.extend({
//     homePage:[ async ({ page }, use) => {
//         await page.goto('/');
//        // await page.getByRole('button', { name: 'OK' }).click();
//         await use(page);
//     }, {
//         auto: true,
//         scope: 'worker'
//     }],

//     signUpLoginPage: async ({page},use) =>{
//         await use(new SignUpLoginPage(page));
//     },

//     mainPage: async ({page}, use) => {
//         await use(new MainPage(page)) 
//     }
// });

// exports.expect = test.expect;