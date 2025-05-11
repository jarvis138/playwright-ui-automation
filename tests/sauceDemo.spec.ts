import { test, expect } from '../utils/testData';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Sauce Demo Inventory Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('should display inventory items', async ({ page }) => {
        await expect(page).toHaveURL(/.*inventory.html/);
        const items = await inventoryPage.getInventoryItems();
        expect(items.length).toBeGreaterThan(0);
    });

    test('should sort products by price low to high', async ({ page, testData }) => {
        await inventoryPage.sortProducts(testData.sortOptions[2].value);
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('should sort products by price high to low', async ({ page, testData }) => {
        await inventoryPage.sortProducts(testData.sortOptions[3].value);
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });

    test('should sort products by name A to Z', async ({ page, testData }) => {
        await inventoryPage.sortProducts(testData.sortOptions[0].value);
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    test('should sort products by name Z to A', async ({ page, testData }) => {
        await inventoryPage.sortProducts(testData.sortOptions[1].value);
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    });

    test('should add item to cart', async ({ page }) => {
        await inventoryPage.addToCart(0);
        const cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe(1);
    });

    test('should remove item from cart', async ({ page }) => {
        await inventoryPage.addToCart(0);
        await inventoryPage.removeFromCart(0);
        const cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe(0);
    });

    test('should verify specific product details', async ({ page, testData }) => {
        const firstProduct = testData.products[0];
        await inventoryPage.clickProduct(0);
        await expect(page).toHaveURL(/.*inventory-item.html/);
        const productName = await page.locator('.inventory_details_name').textContent();
        const productPrice = await page.locator('.inventory_details_price').textContent();
        const productDescription = await page.locator('.inventory_details_desc').textContent();

        expect(productName).toBe(firstProduct.name);
        expect(productPrice).toContain(firstProduct.price.toString());
        expect(productDescription).toBe(firstProduct.description);
    });

    test('should verify all product prices are positive', async ({ page }) => {
        const prices = await inventoryPage.getProductPrices();
        prices.forEach(price => {
            expect(price).toBeGreaterThan(0);
        });
    });

    test('should verify cart badge visibility when empty', async ({ page }) => {
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).not.toBeVisible();
    });

    test('should verify product images are loaded', async ({ page }) => {
        const images = page.locator('.inventory_item_img img');
        const count = await images.count();
        for (let i = 0; i < count; i++) {
            const image = images.nth(i);
            await expect(image).toBeVisible();
            const src = await image.getAttribute('src');
            expect(src).toContain('.jpg');
        }
    });

    test('should verify product links are working', async ({ page }) => {
        const productLinks = page.locator('.inventory_item_name');
        const count = await productLinks.count();
        for (let i = 0; i < count; i++) {
            const link = productLinks.nth(i);
            await link.click();
            await expect(page).toHaveURL(/.*inventory-item.html/);
            await page.goBack();
        }
    });

    test('should verify menu button functionality', async ({ page }) => {
        await inventoryPage.openMenu();
        const menuItems = page.locator('.bm-item');
        await expect(menuItems).toHaveCount(4);
        await inventoryPage.closeMenu();
        await expect(page.locator('.bm-menu-wrap')).not.toBeVisible();
    });
}); 