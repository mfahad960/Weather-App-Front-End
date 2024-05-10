const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function weatherTest() {
  let driver;

  try {
    // Set up Chrome WebDriver
    const options = new chrome.Options();
    options.addArguments('--headless'); // Run Chrome in headless mode

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    // Open the weather app
    await driver.get('http://localhost:3000');
    // Replace with your React app URL

    // Find input field, enter city, and click fetch button
    const inputField = await driver.findElement(By.className('input-field')); // Adjust with the appropriate class name
    await inputField.sendKeys('New York', Key.RETURN); // Replace 'New York' with your desired city

    const fetchButton = await driver.findElement(By.className('fetch-button')); // Adjust with the appropriate class name
    await fetchButton.click();

    // Wait for weather data to load (adjust the timeout as needed)
    await driver.wait(until.elementLocated(By.className('city-name')), 5000);

    // Get and log weather information
    const cityNameElement = await driver.findElement(By.className('city-name')); // Adjust with the appropriate class name
    const temperatureElement = await driver.findElement(By.className('temperature')); // Adjust with the appropriate class name
    const weatherDescriptionElement = await driver.findElement(By.className('weather-description')); // Adjust with the appropriate class name

    const cityName = await cityNameElement.getText();
    const temperature = await temperatureElement.getText();
    const weatherDescription = await weatherDescriptionElement.getText();

    console.log('City Name:', cityName);
    console.log('Temperature:', temperature);
    console.log('Weather Description:', weatherDescription);

    // Additional interactions or assertions can be added as needed

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
