/* Global Variables */
const apiKey = '5743354e8d8813f6e772e02138e62923&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
  const location = document.getElementById('location').value;
  const feelings = document.getElementById('feelings').value;

  getWeather(baseURL, location, apiKey)
    .then(function(data) {
      postData('/add', { date: newDate, temp: data.main.temp, feel: feelings });
    })
    .then(function() {
      updateUI();
    });
}

/* Function to GET Web API Data */
const getWeather = async (baseURL, location, key) => {
  const res = await fetch(baseURL + location + '&appid=' + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('date').innerHTML = allData.date;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to create a new date instance dynamically with JS */
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
