import { Page } from '@playwright/test';

export class InventoryPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private inventoryContainer = '.inventory_container';
    private inventoryItems = '.inventory_item';
    private addToCartButtons = '[data-test^="add-to-cart"]';
    private removeButtons = '[data-test^="remove"]';
    private shoppingCartBadge = '.shopping_cart_badge';
    private sortDropdown = '.product_sort_container';
    private productNames = '.inventory_item_name';
    private productPrices = '.inventory_item_price';

    // Actions
    async isInventoryPageLoaded(): Promise<boolean> {
        return await this.page.isVisible('.inventory_list');
    }

    async getInventoryItemsCount(): Promise<number> {
        return await this.page.locator('.inventory_item').count();
    }

    async getInventoryItems() {
        return await this.page.locator('.inventory_item').all();
    }

    async getProductNames(): Promise<string[]> {
        const names = await this.page.locator('.inventory_item_name').allTextContents();
        return names;
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.page.locator('.inventory_item_price').allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    async sortProducts(option: string): Promise<void> {
        await this.page.waitForSelector('.product_sort_container');
        await this.page.selectOption('.product_sort_container', option);
        await this.page.waitForTimeout(500); // Wait for sorting to complete
    }

    async addToCart(index: number): Promise<void> {
        await this.page.locator('.inventory_item').nth(index).locator('button').click();
    }

    async removeFromCart(index: number): Promise<void> {
        await this.page.locator('.inventory_item').nth(index).locator('button').click();
    }

    async getCartItemCount(): Promise<number> {
        const badge = this.page.locator('.shopping_cart_badge');
        if (await badge.isVisible()) {
            return parseInt(await badge.textContent() || '0');
        }
        return 0;
    }

    async clickProduct(index: number): Promise<void> {
        await this.page.locator('.inventory_item_name').nth(index).click();
    }

    async openMenu(): Promise<void> {
        await this.page.click('#react-burger-menu-btn');
        await this.page.waitForSelector('.bm-menu-wrap');
    }

    async closeMenu(): Promise<void> {
        await this.page.click('#react-burger-cross-btn');
        await this.page.waitForSelector('.bm-menu-wrap', { state: 'hidden' });
    }
} 