
const searchPhone = () => {
    const searchField = document.getElementById("search-field");

    // Toggle Function Start  
    const toggleSpinner = displayStyle => {
        document.getElementById('spinner').style.display = displayStyle;
    }

    // Error Handling
    const nullinput = document.getElementById('null-input');
    if (searchField.value == "") {
        nullinput.innerText = "Please enter a correct brand name 🙏";
    }
    else {
        nullinput.innerText = "";
    }
    const searchText = searchField.value;

    // Showing Spinner 
    toggleSpinner('block');

    searchField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data.data));

    const displayResults = phones => {
        const sliced = (phones.slice(0, 20));
        const searchResult = document.getElementById("search-result");
        searchResult.textContent = "";
        sliced.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = ` 
                <div class="col ">
                <div class="border-style card ">
                    <img class="thum-img" src="${phone.image}" class="w-75" alt="...">
                    <div class="card-body-style card-body">
                        <h5 class="phone-name">${phone.phone_name}</h5>
                        <p class="brand"> Brand: <span>${phone.brand}</span> </p>
                        <button onclick="loadSinglePhone('${phone.slug}')" class=" btn-style" data-bs-toggle="modal" data-bs-target="#exampleModal"> More
                            Details </button>
                    </div>
                </div>
                </div>
            `;

            searchResult.appendChild(div);
        });

        // Hiding Spinner 
        toggleSpinner('none');
    }
}

const loadSinglePhone = phoneslug => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneslug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySinglePhone(data.data));
}

// Display Single Phone Details with Modal 
const displaySinglePhone = singlePhone => {
    const phoneDetails = document.getElementById("full-details");
    const div = document.createElement('div');
    div.classList.add("row", "g-4", "img-center");
    div.innerHTML = `
        <div class="col-md-4">
        <img class="img-margin" src="${singlePhone.image}" class="rounded float-left" alt="...">
        </div>
        <div class="col-md-8"> 
            <p class="modalbrand-title"><span class="main-feature">Release Date: </span>  ${singlePhone?.releaseDate} </p> 
            <p class="modalbrand-title"><span class="main-feature">Display: </span>${singlePhone.mainFeatures.displaySize} </p> 
            <p class="modalbrand-title"><span class="main-feature">ChipSet: </span>${singlePhone.mainFeatures.chipSet} </p> 
            <p class="modalbrand-title"><span class="main-feature">Storage: </span>${singlePhone.mainFeatures.storage} </p> 

            <p class="feature-title">Others:</p>
            <div class="other-sub"> 
            <p><span class="other-span">Bluetooth:</span> <span>${singlePhone?.others?.Bluetooth}</span></p>
            <p><span class="other-span">GPS:</span> <span>${singlePhone?.others?.GPS}</span></p>
            <p><span class="other-span">NFC:</span> <span>${singlePhone?.others?.NFC}</span></p>
            <p><span class="other-span">Radio:</span> <span>${singlePhone?.others?.Radio}</span></p>
            <p><span class="other-span">USB:</span> <span>${singlePhone?.others?.USB}</span></p>
            <p><span class="other-span">WLAN:</span> <span>${singlePhone?.others?.WLAN}</span></p> </div>

            <p class="feature-title"> Sensors: </p>
            <p id="sensors">
            <span> ${singlePhone.mainFeatures.sensors[0]}</span>
            <span> ${singlePhone.mainFeatures.sensors[1]}</span> 
            <span> ${singlePhone.mainFeatures.sensors[2]}</span> 
            <span> ${singlePhone.mainFeatures.sensors[3]}</span>
            <span> ${singlePhone.mainFeatures.sensors[4]}</span>
            <span> ${singlePhone.mainFeatures.sensors[5]}</span>
            <span> ${singlePhone.mainFeatures.sensors[6]}</span> </p>
        </div>
    `;

    phoneDetails.textContent = "";
    phoneDetails.appendChild(div);
}