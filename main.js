const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function myFunction() {
    await wait(100);
}

search.addEventListener('click', () => {

    const APIKey = '18aac6feb4622e2b1e042a5f30bfd479';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
            const image1 = document.querySelector('.weather-box .img1');
            const image2 = document.querySelector('.weather-box .img2');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image1.src = 'images/clear.png';
                    image2.src = 'images/flower.png';
                    break;

                case 'Rain':
                    image1.src = 'images/rain.png';
                    image2.src = 'images/flower.png';
                    break;

                case 'Snow':
                    image1.src = 'images/snow.png';
                    image2.src = 'images/flower.png';
                    break;

                case 'Clouds':
                    image1.src = 'images/cloud.png';
                    image2.src = 'images/flower.png';
                    break;

                case 'Mist':
                    image1.src = 'images/mist.png';
                    image2.src = 'images/flower.png';
                    break;

                case 'Haza':
                    image1.src = '';
                    image2.src = 'images/flower.png';
                    break;

                default:
                    image1.src = '';
                    image2.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            image1.classList.remove('moveWeather');
            myFunction().then(() => image1.classList.add('moveWeather'));
            container.style.height = '590px';
        });
});