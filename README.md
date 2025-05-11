# Playwright Assignment

This project provides robust UI test automation using Playwright and TypeScript for the Sauce Demo website (https://www.saucedemo.com/), focusing on inventory and product management functionality.

## Project Structure

```
├── pages/               # Page Object Models
│   ├── LoginPage.ts
│   └── InventoryPage.ts
├── tests/              # Test files
│   └── sauceDemo.spec.ts
├── package.json        # Project dependencies
├── tsconfig.json      # TypeScript configuration
├── playwright.config.ts # Playwright configuration
└── README.md          # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## IDE Setup

### VS Code (Recommended)
1. Install VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Install recommended extensions:
   - ESLint
   - Prettier
   - Playwright Test for VSCode
3. Open the project folder in VS Code
4. The project includes VS Code configurations for:
   - Debugging tests
   - TypeScript support
   - Code formatting
   - File exclusions

### Eclipse
1. Install Eclipse IDE for JavaScript/TypeScript Developers
2. Install Nodeclipse plugin:
   - Help > Eclipse Marketplace
   - Search for "Nodeclipse"
   - Install "Nodeclipse" and "Nodeclipse Enide"
3. Import the project:
   - File > Import > General > Existing Projects into Workspace
   - Select the project directory
4. Run tests using the terminal:
   ```bash
   npm test
   ```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-automation
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests (headed Chrome only)
```bash
npm test
```

### From VS Code
1. Open the project in VS Code
2. Use the Testing sidebar to:
   - Run individual tests
   - Debug tests
   - View test results
3. Or use the Debug configuration:
   - Press F5
   - Select "Debug Playwright Tests"

### From Eclipse
1. Open the project in Eclipse
2. Open Terminal view:
   - Window > Show View > Terminal
3. Run tests:
   ```bash
   npm test
   ```

## Viewing Test Results
- HTML Report: `npx playwright show-report`
- Test Results: `test-results/` directory
- Screenshots: `test-results/` directory (on test failure)

## Test Cases

The project includes 13 unique, well-structured test cases focusing on inventory and product management:

1. Inventory items display verification
2. Adding item to cart
3. Removing item from cart
4. Sorting products by price (low to high)
5. Sorting products by price (high to low)
6. Sorting products by name (A to Z)
7. Sorting products by name (Z to A)
8. Verifying specific product details
9. Verifying all prices are positive
10. Verifying cart badge visibility
11. Verifying product images are loaded
12. Verifying product links are working
13. Verifying menu button functionality

## SOLID Principles Implementation

- **Single Responsibility Principle (SRP):** Each page object is responsible for its own functionality. Test cases are focused and separated from page logic.
- **Open/Closed Principle (OCP):** Page objects are designed for extension. New test cases can be added without modifying existing code.
- **Interface Segregation Principle (ISP):** Clean, focused interfaces for page objects. No unnecessary dependencies.
- **Dependency Inversion Principle (DIP):** Page objects depend on abstractions. Tests depend on page objects, not implementation details.

## Test Design Techniques

- **Positive Testing:** Validating successful cart operations and product sorting.
- **Data Validation:** Checking product names, prices, and cart counts.
- **State-Based Testing:** Verifying cart and inventory page states, sorting states.
- **UI Interaction Testing:** User interactions with products, cart badge, sorting, and menu functionality.

## Best Practices Implemented

- **Page Object Model:** Reusable, maintainable, and scalable test code.
- **TypeScript:** Type safety and maintainability.
- **Error Handling:** Screenshots and detailed reports on failure.
- **Code Organization:** Clear, modular structure and consistent naming.
- **Test Configuration:** Headed Chrome execution, parallelism, and configurable timeouts.

