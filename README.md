# Test Task

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
    npm install
3. **Install browsers**
    npx playwright install
## Running Tests

### Run all tests
    npx playwright test

### Run tests in UI mode
    npx playwright test --ui

### Run a specific test file
    npx playwright test tests/api/klines.spec.ts


### View HTML test report
After running tests, open the report:
    npx playwright show-report