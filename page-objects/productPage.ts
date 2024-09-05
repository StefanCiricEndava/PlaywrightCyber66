import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class ProductPage extends HelperBase{

    readonly page: Page
    readonly productName: Locator
    readonly productPrice: Locator
    readonly productStock: Locator

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.productName =  page.getByTestId('product-name')
        this.productPrice = page.getByTestId('price').getByTestId('special-price')
        this.productStock = page.getByTestId('quantity-selector-stock')
    }

    

    
}