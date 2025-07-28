let baseUrl = `https://v6.exchangerate-api.com/v6/2056085efcebaf54db93cf82/latest/`;
let from = document.getElementById("from");
let to = document.getElementById("to");
let fullUrl = `${baseUrl}USD`;
let results = document.querySelector(".results");
let amount = document.getElementById("amount");
let warning = document.getElementById("warning");


async function currency(url) {
    let res = await fetch(url);
    let response = await res.json();
    const {conversion_rates} = response;
    const keys = Object.keys(conversion_rates);
    appendIt(keys);
        document.querySelector("button").addEventListener("click", () => {
            searchCurrency(`${baseUrl}${from.value}`);

        });
    return keys;
}

currency(fullUrl);


async function searchCurrency(url) {
        let res = await fetch(url);
        let response = await res.json();
        const {conversion_rates} = response;
        const keys = Object.keys(conversion_rates);
        currencePrice(from.value, to.value);
        function currencePrice(f, t) {
        const filteredFrom = conversion_rates[f];
        const filteredTo = conversion_rates[t];
        convertRate(filteredFrom, filteredTo);
    }
}


function appendIt(keys){
    let i = 0;
    keys.forEach((key) => {
        toOption = document.createElement("option");
        fromOption = document.createElement("option");
        toOption.value = key;
        toOption.textContent = `${key}`;
        fromOption.value = key;
        fromOption.textContent = `${key}`;
        from.appendChild(fromOption);
        to.appendChild(toOption);        
        if(i == 0){
        fromOption.selected = true;
        }else if(i == 43){
        toOption.selected = true;
        }
        i++;
        
    });
}


amount.addEventListener("keydown", () => {
            amount.classList.remove("errorAmount");
            warning.textContent = ``;
});

function convertRate(f, t){
    if(amount.value == "" || amount.value == 0){
        console.log("Please enter valid value greater than 0!!!");
        amount.classList.add("errorAmount");
        warning.textContent = `Please enter valid value greater than 0!!!`;
           
        
    }else {
        let fRate = amount.value * f;
        let tRate = amount.value * t;
        results.textContent = `${fRate.toFixed(2)} ${from.value} = ${tRate.toFixed(2)} ${to.value}`;
    }
}
