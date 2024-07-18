const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function weatherTest() {
  let driver;
  let url = 'https://weatherreactapp.azurewebsites.net/';
  let inputs = ['new YoRk', 'Mumbai', 'lonDon', 'karAChI', 'Mars', 'indio', 'SEOUL'];

  try {
    const options = new chrome.Options();
    options.addArguments('--headless'); // Run Chrome in headless mode (no GUI)
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get(url);

    /*
    await performWeatherSearch(driver, 'new YoRk');
    await performWeatherSearch(driver, 'Mumbai');
    await performWeatherSearch(driver, 'lonDon');
    await performWeatherSearch(driver, 'karAChI');
    await performWeatherSearch(driver, 'Mars');
    await performWeatherSearch(driver, 'indio');
    await performWeatherSearch(driver, 'SEOUL');*/
    
    for (let i = 0; i < inputs.length; i++){
      await performWeatherSearch(driver, inputs[i]);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
  console.log('----------------------')
  driver.quit();
})();

async function performWeatherSearch(driver, city) {
  // Find input field, enter city, and click fetch button
  const inputField = await driver.findElement(By.className('input-field'));

  await driver.sleep(50); // Wait for 50 ms before clearing the input field
  //const value1 = await inputField.getAttribute('value'); // Get the value attribute of the input field
  //console.log('Input field value before:', value1); // Print the value to the console

  await inputField.clear();
  await inputField.sendKeys(city);

  //console.log('city value passed as parameter: ', city)

  //const value2 = await inputField.getAttribute('value'); // Get the value attribute of the input field
  //console.log('Input field value after:', value2); // Print the value to the console

  const fetchButton = await driver.findElement(By.id('fetch-button'));
  await fetchButton.click();

  await driver.sleep(200);

  try {
    await driver.wait(until.elementLocated(By.className('city-name')), 5000);

    // Get and log weather information
    const cityNameElement = await driver.findElement(By.className('city-name'));
    const temperatureElement = await driver.findElement(By.id('temp'));
    const feelsLikeElement = await driver.findElement(By.id('feels_like'));
    const humidityElement = await driver.findElement(By.id('humidity'));
    const weatherDescriptionElement = await driver.findElement(By.className('weather-description'));
    const unitButton = await driver.findElement(By.id('unit-button'));

    const cityName = await cityNameElement.getText();
    const temperature_C = await temperatureElement.getText();
    const feels_like_C = await feelsLikeElement.getText();

    await unitButton.click(); // convert temps to Fahrenheit

    const temperature_F = await temperatureElement.getText();
    const feels_like_F = await feelsLikeElement.getText();

    await unitButton.click(); // convert temps to Celsius

    const humidity = await humidityElement.getText();
    const weatherDescription = await weatherDescriptionElement.getText();

    console.log('----------------------')
    console.log('City Name:', cityName);
    console.log('Temperature:' + temperature_C.split(':')[1] +  ' /' + temperature_F.split(':')[1]);
    console.log('Feels Like:' + feels_like_C.split(':')[1] +  ' /' + feels_like_F.split(':')[1]);
    console.log(humidity);
    console.log(weatherDescription);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    await inputField.clear(); // Clear the input field if fetching data fails
  }
}
