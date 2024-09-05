import { Locator, Page } from "@playwright/test";
import { MainPage } from '../page-objects/mainPage'
import { SignUpLoginPage } from '../page-objects/signUpLoginPage';
import { CartPage } from "./cartPage";
import { ProductPage } from "./productPage";

export class PageManager{

    private readonly page: Page
    private readonly mainPage: MainPage
    private readonly signUpLoginPage: SignUpLoginPage
    private readonly cartPage: CartPage
    private readonly productPage: ProductPage

    constructor(page: Page){
        this.page = page
        this.mainPage = new MainPage(this.page)
        this.signUpLoginPage = new SignUpLoginPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.productPage = new ProductPage(this.page)
    }

    onHomePage(){
        return this.mainPage
    }

    onLoginAndSignUpPage(){
        return this.signUpLoginPage
    }

    onCartPage(){
        return this.cartPage
    }

    onProductPage(){
        return this.productPage
    }

}