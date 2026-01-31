// API Configuration - loads from .env via Vite
const API_KEY = import.meta.env.VITE_FX_API_KEY;

const selects = document.querySelectorAll(".pt");
const inputs = document.querySelectorAll(".input");
const msg = document.querySelector(".msg");
const form = document.getElementById("converter-form");
const exchangeIcon = document.getElementById("exchange");

// Initialize default values
const DEFAULT_FROM = "USD";
const DEFAULT_TO = "INR";

// Check if API key is configured
if (!API_KEY || API_KEY === 'undefined') {
    console.error('⚠️ API key not found in .env file');
    console.log('Make sure you have VITE_FX_API_KEY in your .env file');
    if (msg) {
        msg.innerText = "⚠️ API key not configured. Check .env file";
        msg.style.color = "#ffcccc";
    }
}

// Populate select dropdowns with currency codes
function populateSelects() {
    selects.forEach((select, index) => {
        for (let code in countryList) {
            let option = document.createElement("option");
            option.value = code;
            option.textContent = code;
            select.appendChild(option);
        }

        // Set default values
        if (index === 0) {
            select.value = DEFAULT_FROM;
        } else {
            select.value = DEFAULT_TO;
        }

        // Add change event listener
        select.addEventListener("change", () => {
            updateFlag(select);
        });
    });
}

// Update flag and currency name based on selection
function updateFlag(select) {
    const currCode = select.value;
    const countryCode = countryList[currCode];
    const countryDiv = select.closest(".country1") || select.closest(".country2");
    const img = countryDiv.querySelector("img");
    const name = countryDiv.querySelector(".name p");

    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img.alt = `${countryCode} Flag`;
    name.innerText = currCode;
}

// Convert currency
async function convertCurrency() {
    // Check if API key is available
    if (!API_KEY || API_KEY === 'undefined') {
        msg.innerText = "⚠️ API key not configured. Please check .env file";
        msg.style.color = "#ffcccc";
        return;
    }

    const fromCurr = selects[0].value;
    const toCurr = selects[1].value;
    const amount = parseFloat(inputs[0].value);

    // Validation
    if (!amount || isNaN(amount) || amount <= 0) {
        msg.innerText = "Please enter a valid amount";
        msg.style.color = "#ffcccc";
        inputs[1].value = "";
        return;
    }

    // Show loading state
    msg.innerText = "Converting...";
    msg.style.color = "#fff";
    
    const button = document.querySelector("button");
    if (button) {
        button.disabled = true;
    }

    try {
        const response = await axios.get("https://api.fxratesapi.com/convert", {
            params: {
                from: fromCurr,
                to: toCurr,
                amount: amount,
                format: "json",
                access_key: API_KEY
            }
        });

        if (response.data && response.data.result) {
            const result = response.data.result;

            // Update UI with results
            msg.innerText = `${amount} ${fromCurr} = ${result.toFixed(2)} ${toCurr}`;
            msg.style.color = "#fff";
            inputs[1].value = result.toFixed(2);
        } else {
            throw new Error("Invalid API response");
        }
    } catch (error) {
        console.error("API Error:", error);
        
        let errorMessage = "Failed to fetch exchange rate. Please try again.";
        
        if (error.response) {
            if (error.response.status === 429) {
                errorMessage = "Rate limit exceeded. Please wait a moment.";
            } else if (error.response.status === 401) {
                errorMessage = "Invalid API key. Please check .env configuration.";
            }
        } else if (error.request) {
            errorMessage = "Network error. Please check your connection.";
        }
        
        msg.innerText = errorMessage;
        msg.style.color = "#ffcccc";
        inputs[1].value = "";
    } finally {
        if (button) {
            button.disabled = false;
        }
    }
}

// Swap currencies
function swapCurrencies() {
    const fromSelect = selects[0];
    const toSelect = selects[1];
    
    // Swap select values
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    
    // Update flags
    updateFlag(fromSelect);
    updateFlag(toSelect);
    
    // If there's an amount, convert immediately
    if (inputs[0].value && parseFloat(inputs[0].value) > 0) {
        convertCurrency();
    }
}

// Event Listeners
if (form) {
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        convertCurrency();
    });
} else {
    // Fallback if form element doesn't exist
    const button = document.querySelector("button");
    if (button) {
        button.addEventListener("click", (evt) => {
            evt.preventDefault();
            convertCurrency();
        });
    }
}

if (exchangeIcon) {
    exchangeIcon.addEventListener("click", swapCurrencies);
}

// Allow Enter key in amount input to trigger conversion
if (inputs[0]) {
    inputs[0].addEventListener("keypress", (evt) => {
        if (evt.key === "Enter") {
            evt.preventDefault();
            convertCurrency();
        }
    });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    populateSelects();
    // Optionally, perform initial conversion
    if (inputs[0] && inputs[0].value && parseFloat(inputs[0].value) > 0) {
        convertCurrency();
    }
});