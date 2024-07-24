// Get references to the SVG circles representing the traffic lights
let redLight = document.getElementById("redLight");
let yellowLight = document.getElementById("yellowLight");
let greenLight = document.getElementById("greenLight");

// Declare variables to store the interval ID and the current light state
let interval;
let currentLight = 'red'; // Track the current light state

function changeLight(light) {
    // Set all lights to dim
    redLight.setAttribute("opacity", "0.5");
    yellowLight.setAttribute("opacity", "0.5");
    greenLight.setAttribute("opacity", "0.5");

    // Set the specified light to bright
    if (light === 'red') {
        redLight.setAttribute("opacity", "1");
    } else if (light === 'yellow') {
        yellowLight.setAttribute("opacity", "1");
    } else if (light === 'green') {
        greenLight.setAttribute("opacity", "1");
    }

    // Update the current light state
    currentLight = light;
}

function startTrafficLight() {
    // Define the sequence of light changes using promises
    let sequence = () => {
        return new Promise((resolve) => {
            if (currentLight === 'red') {
                setTimeout(() => {
                    changeLight('red');
                    resolve();
                }, 0);
            } else if (currentLight === 'yellow') {
                setTimeout(() => {
                    changeLight('yellow');
                    resolve();
                }, 0);
            } else if (currentLight === 'green') {
                setTimeout(() => {
                    changeLight('green');
                    resolve();
                }, 0);
            }
        }).then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (currentLight === 'red') {
                        changeLight('yellow');
                    } else if (currentLight === 'yellow') {
                        changeLight('green');
                    } else if (currentLight === 'green') {
                        changeLight('red');
                    }
                    resolve();
                }, 3000); // Wait for 5 seconds before changing light
            });
        });
    };

    interval = setInterval(sequence, 5000); // Repeat the sequence every 15 seconds
    sequence(); // Start the initial sequence immediately
}

function stopTrafficLight() {
    clearInterval(interval); // Clear the interval to stop the traffic light sequence
}
