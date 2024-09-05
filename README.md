# PlaywrightCyber66
This is my task for technical interview for Cyber66

## FRAMEWORK SETUP
 ### Prerequisites
 Node.js v21.5.0

 ### IDE Visual Studio Code Extension
 
* Playwright Test for VSCode - v1.1.7


## SOURCE

1. Clone repo
   ```
   git clone https://github.com/StefanCiricEndava/PlaywrightCyber66.git
   ```

2. CD into directory
   ```
   cd PlaywrightCyber66  
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Install browsers
   ```
   npx playwright install
   ```

## SETTINGS
### Environment setings
Environmnet can be defined in 

`../utils/testData.json` file.

## COMMAND FOR TEST EXECUTION

Here are the most common options available in the command line.

Run all the tests in headed mode 

`npm run test`

Run all the tests in UI mode 

`npm run testui`

Run in debug mode with Playwright Inspector

`npm run debug`

`Run all the tests in webkit browser

``npm run webkit`

Ask for help

`npx playwright test --help`


## REPORT

```bash
npx playwright show-report
```


## Troubleshoting

1. The test can not be started directly form the VCode. 

    Playwright browser are not installed.

    ### Solution:
    ```bash
    Press Ctrl+Shift+P to open the Command Palette in VSCode, type 'Playwright' and select 'Install Playwright Browsers'.
    ```
    OR
    
    ```
    npx playwright install
    ```
