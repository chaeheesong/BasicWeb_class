document.querySelector(".form-data"),document.querySelector(".region-name"),document.querySelector(".api-key"),document.querySelector(".errors"),document.querySelector(".loading"),document.querySelector(".result-container"),document.querySelector(".carbon-usage"),document.querySelector(".fossil-fuel"),document.querySelector(".my-region"),document.querySelector(".clear-btn");

const form = document.querySelector(".form-data");
const region = document.querySelector("#regionName");
const apiKey = document.querySelector("#apiKey");
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const results = document.querySelector(".result");
const carbonUsage = document.querySelector(".carbon-usage");
const fossilFuel = document.querySelector(".fossil-fuel");
const myRegion = document.querySelector(".my-region");
const clearBtn = document.querySelector(".clear-btn");

function reset(e) {
    console.log('뭐가 되는중')
    e.preventDefault();
    localStorage.removeItem('regionName');
    init();
}


// clear 버튼
function reset(e) {
    e.preventDefault();
    localStorage.removeItem('apiKey');
    localStorage.removeItem('regionName');
    form.style.display = 'block';
    results.style.display = 'none';
    loading.style.display = 'none';
    errors.textContent = '';
}

const apikey = 'ytrJmGCaj0dp2tD89NmM';

/*
async function displayCarbonUsage(apiKey, region) {
    try {
        loading.style.display = 'block';
        form.style.display = 'none';
        results.style.display = 'none';
        errors.textContent = '';

        // 전체 carbonIntensity 가져오기
        const fullResponse = await fetch(
            `https://api.electricitymaps.com/v3/carbon-intensity/latest?zone=${region}`,
            {
                method: 'GET',
                headers: {
                    'auth-token': apiKey,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!fullResponse.ok) throw new Error(`Full API request failed: ${fullResponse.status}`);
        const fullData = await fullResponse.json();
        const carbonIntensity = fullData.carbonIntensity;

        // 화석 연료만 가져오기
        const fossilResponse = await fetch(
            `https://api.electricitymaps.com/v3/carbon-intensity-fossil-only/latest?zone=${region}`,
            {
                method: 'GET',
                headers: {
                    'auth-token': apiKey,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!fossilResponse.ok) throw new Error(`Fossil-only API request failed: ${fossilResponse.status}`);
        const fossilData = await fossilResponse.json();
        const fossilValue = fossilData.data[0].value;

        // 화석 연료 비율 계산
        const fossilPercentage = (fossilValue / carbonIntensity) * 100;
        
        // 색상 업데이트
        calculateColor(carbonIntensity);

        // UI 업데이트
        loading.style.display = 'none';
        results.style.display = 'block';
        myRegion.textContent = region.toUpperCase();
        carbonUsage.textContent = `${Math.round(carbonIntensity)} grams (grams CO₂ emitted per kWh)`;
        fossilFuel.textContent = `${fossilPercentage.toFixed(2)}% (percentage of fossil fuels used)`;

    } catch (error) {
        console.error('Error fetching carbon data:', error);
        loading.style.display = 'none';
        results.style.display = 'none';
        errors.textContent = "Couldn't fetch data. Check API key and region code.";
    }
}
*/


async function displayCarbonUsage(apiKey, region) {
    try {
        console.log('Fetching region:', region);
        // Fetch carbon intensity data from CO2 Signal API
        const response = await fetch('https://api.electricitymaps.com/v3/carbon-intensity/latest', {
            method: 'GET',
            headers: {
                'auth-token': 'ytrJmGCaj0dp2tD89NmM',
                'Content-Type': 'application/json'
            },
            // Add query parameters for the specific region
            ...new URLSearchParams({ countryCode: region }) && {
                url: `https://api.electricitymaps.com/v3/carbon-intensity/latest?countryCode=${region}`
            }
        });

        // Check if the API request was successful
        if (!response.ok) {
            console.log('error');
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const carbonData = data;
        console.log('???',carbonData);
        // Calculate rounded carbon intensity value
        let carbonIntensity = Math.round(carbonData.carbonIntensity);

        calculateColor(carbonIntensity);

        // Update the user interface with fetched data
        loading.style.display = 'none';
        form.style.display = 'none';
        myRegion.textContent = region.toUpperCase();
        carbonUsage.textContent = `${carbonIntensity} grams (grams CO₂ emitted per kilowatt hour)`;
        fossilFuel.textContent = `55.41% (percontage of fossil fuels used to generate electricity)`;
        results.style.display = 'block';

        // TODO: calculateColor(carbonIntensity) - implement in next lesson
    } catch (error) {
        console.log('errer2');
        console.error('Error fetching carbon data:', error);
        
        // Show user-friendly error message
        loading.style.display = 'none';
        results.style.display = 'none';
        errors.textContent = 'Sorry, we couldn\'t fetch data for that region. Please check your API key and region code.';
    }
}


form.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => reset(e));
init();

function init() {
    // Check if user has previously saved API credentials
    const storedApiKey = localStorage.getItem('apiKey');
    const storedRegion = localStorage.getItem('regionName');

    // Set extension icon to generic green (placeholder for future lesson)
    // TODO: Implement icon update in next lesson

    if (storedApiKey === null || storedRegion === null) {
        // First-time user: show the setup form
        form.style.display = 'block';
        results.style.display = 'none';
        loading.style.display = 'none';
        clearBtn.style.display = 'none';
        errors.textContent = '';
    } else {
        // Returning user: load their saved data automatically
        displayCarbonUsage(storedApiKey, storedRegion);
        results.style.display = 'none';
        form.style.display = 'none';
        clearBtn.style.display = 'block';
    }
}

calculateColor = async (value) => {
    let co2Scale = [0, 150, 600, 750, 800];
    let colors = ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'];

    let closestNum = co2Scale.sort((a, b) => {
        return Math.abs(a - value) - Math.abs(b - value);
    })[0];
    //console.log(value + ' is closest to ' + closestNum);
    let num = (element) => element > closestNum;
    let scaleIndex = co2Scale.findIndex(num);

    let closestColor = colors[scaleIndex];
    console.log(scaleIndex, closestColor);

    chrome.runtime.sendMessage({ action: 'updateIcon', value: { color: closestColor } });
};

function handleSubmit(e) {
    console.log('버튼 눌림');
    e.preventDefault();
    setUpUser(apiKey.value, region.value);
}

function setUpUser(apiKey, region) {
    console.log("11setUpUser 실행됨", apiKey, region);
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('regionName', region);

    form.style.display = 'none';
    results.style.display = 'block';
    loading.style.display = 'none';
    errors.textContent = '';
    clearBtn.style.display = 'block';

    displayCarbonUsage(apiKey, region);
}

const img = document.getElementById("duck-img");
const btn = document.getElementById("refresh");

async function fetchDuck() {
    try {
        const response = await fetch("https://random-d.uk/api/v2/random");
        const data = await response.json();
        img.src = data.url;
    } catch (err) {
        img.alt = "Failed to load duck";
    }
}
  
btn.addEventListener("click", fetchDuck);
fetchDuck();