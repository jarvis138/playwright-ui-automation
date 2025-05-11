import { test as base } from '@playwright/test';

// Test data interface
export interface TestData {
  products: {
    name: string;
    price: number;
    description: string;
  }[];
  sortOptions: {
    value: string;
    label: string;
  }[];
}

// Test data
export const testData: TestData = {
  products: [
    {
      name: 'Sauce Labs Backpack',
      price: 29.99,
      description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
    },
    {
      name: 'Sauce Labs Bike Light',
      price: 9.99,
      description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.'
    },
    {
      name: 'Sauce Labs Bolt T-Shirt',
      price: 15.99,
      description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.'
    }
  ],
  sortOptions: [
    { value: 'az', label: 'Name (A to Z)' },
    { value: 'za', label: 'Name (Z to A)' },
    { value: 'lohi', label: 'Price (low to high)' },
    { value: 'hilo', label: 'Price (high to low)' }
  ]
};

// Extend the base test with test data
export const test = base.extend<{ testData: TestData }>({
  testData: [async ({ }, use) => {
    await use(testData);
  }, { scope: 'test' }]
});

export { expect } from '@playwright/test'; 