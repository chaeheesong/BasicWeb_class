document.querySelector(".form-data"),document.querySelector(".region-name"),document.querySelector(".api-key"),document.querySelector(".errors"),document.querySelector(".loading"),document.querySelector(".result-container"),document.querySelector(".carbon-usage"),document.querySelector(".fossil-fuel"),document.querySelector(".my-region"),document.querySelector(".clear-btn");

const form = document.querySelector(".form-data");
const region = document.querySelector("#region");
const apiKey = document.querySelector("#api");
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const results = document.querySelector(".result");
const carbonUsage = document.querySelector(".carbon-usage");
const fossilFuel = document.querySelector(".fossil-fuel");
const myRegion = document.querySelector(".my-region");
const clearBtn = document.querySelector(".clear-btn");


form.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => reset(e));
init();

function reset(e) {
    e.preventDefault();
    localStorage.removeItem('regionName');
    init();
}

function init() {
    const storedApiKey = localStorage.getItem('apiKey');
    const storedRegion = localStorage.getItem('regionName');
    //set icon to be generic green
    //todo
    if (storedApiKey === null || storedRegion === null) {
        form.style.display = 'block';
        results.style.display = 'none';
        loading.style.display = 'none';
        clearBtn.style.display = 'none';
        errors.textContent = '';

    } else {
        displayCarbonUsage(storedApiKey, storedRegion);
        results.style.display = 'none';
        form.style.display = 'none';
        clearBtn.style.display = 'block';
    }
};

function handleSubmit(e) {
    e.preventDefault();
    setUpUser(apiKey.value, region.value);
}

function setUpUser(apiKey, regionName) {
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('regionName', regionName);

    form.style.display = 'none';       // form 숨기기
    results.style.display = 'block';   // 결과 영역 보여주기
    loading.style.display = 'block';
    errors.textContent = '';
    clearBtn.style.display = 'block';

    displayCarbonUsage(apiKey, regionName); //다음시간에
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