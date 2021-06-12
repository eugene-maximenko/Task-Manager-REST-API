const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent);

const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;

const celsiusToFahrenheit = (temp) => (temp * 1.8) + 32;

//
// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!

module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}