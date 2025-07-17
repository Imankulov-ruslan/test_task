# Test Task
Тест кейсы описаны в файле specification_test_cases.md под секцией "Тестовые Сценарии" для каждого из ендпоинтов. Тамже помечены те сценарии, которые реализованы в автотестах.

Архитектура тестов представляет собой сервисы соответсвующие ендпоинтам и используещие токен и стейт которые обновляется перед запуском тестов, сервисы использованы не напрямую, а через фиксутры для более гибкого управления и расширяемости тестов. Отдельно выделены типы и интерфейсы, необходимые для работы тайпскрипта, тест разбиты по тестируемым ендпоитам. В фреймворк добавлены преттир и линтер, для сохранения качества кода.
Сервис с вебсокетами у меня не работал, не смог подебажить и запустить тесты.
## Getting Started
Pre-requsistes:
- Node js v22.14.0 installed

1. **Clone the repository**
2. **Install dependencies**
    npm install
3. **Install browsers**
    npx playwright install
4. **Fill secrets**
    Rename ".env.example" file to ".env" and fill secrets

## Running Tests

### Run all tests
    npm test

### Run tests in UI mode
    npm test:ui

### Run a specific test file
    npx playwright test tests/api/klines.spec.ts

### View HTML test report
    npm show-report