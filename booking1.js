/* header display */
fetch('../header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('body').insertAdjacentHTML('afterbegin', data);
    })
    .catch(error => console.error('Error loading header:', error));

/* Extract URL parameters */
var urlParams = new URLSearchParams(location.search);
var departCountry = urlParams.get('depart');
var landCountry = urlParams.get('land');

/* factory function for flight objects */
function createFlight(airline, price, stops, duration, departure, arrival, departCountry, landCountry) {
    return {
        airline: airline,
        price: price,
        stops: stops,
        duration: duration,
        departure: departure,
        arrival: arrival,
        departCountry: departCountry,
        landCountry: landCountry
    };
}

var flightData = [
    createFlight('Air France', 430, '1-stop', 10, '03:30', '11:30', 'Egypt', 'Edinburgh'),
    createFlight('Air Canada', 500, 'direct', 8, '09:30', '17:30', 'Egypt', 'Edinburgh'),
    createFlight('American Airlines', 680, '2-stops', 6, '01:30', '07:30', 'Egypt', 'Edinburgh'),
    createFlight('Air France', 150, 'direct', 7, '06:00', '13:00', 'Egypt', 'Edinburgh'),
    createFlight('American Airlines', 220, '1-stop', 9, '08:00', '17:00', 'Egypt', 'Edinburgh'),
    createFlight('Air Canada', 300, '2-stops', 12, '10:00', '22:00', 'Egypt', 'Edinburgh'),
    createFlight('American Airlines', 250, 'direct', 8, '02:00', '10:00', 'Egypt', 'Liverpool'),
    createFlight('Air Canada', 750, '2-stops', 15, '05:00', '20:00', 'Egypt', 'London'),
    createFlight('Air France', 680, '1-stop', 12, '04:00', '16:00', 'Egypt', 'Belfast'),
    createFlight('American Airlines', 300, 'direct', 9, '01:00', '10:00', 'Egypt', 'Manchester'),
    createFlight('Air Canada', 350, '1-stop', 11, '06:00', '17:00', 'Egypt', 'Leeds'),
    createFlight('American Airlines', 800, '2-stops', 14, '07:00', '21:00', 'Egypt', 'Birmingham'),
    createFlight('Air France', 520, '1-stop', 10, '08:00', '18:00', 'Egypt', 'Glasgow'),
    createFlight('Air Canada', 650, '1-stop', 11, '09:00', '20:00', 'Egypt', 'Aberdeen'),
    createFlight('American Airlines', 330, '2-stops', 16, '10:00', '02:00', 'Egypt', 'Newcastle'),
    createFlight('Air Canada', 290, '2-stops', 17, '11:00', '04:00', 'Egypt', 'Cardiff'),
    createFlight('Air France', 730, '2-stops', 18, '12:00', '06:00', 'Egypt', 'Newquay'),
    createFlight('American Airlines', 410, '2-stops', 19, '13:00', '08:00', 'Egypt', 'Exeter')
];

/* Filter flights based on depart and land country */
var filteredFlights = [];
for (var i = 0; i < flightData.length; i++) {
    var flight = flightData[i];
    if (flight.departCountry === departCountry && flight.landCountry === landCountry) {
        filteredFlights.push(flight);
    }
}

/* Function to create flight result HTML */
function createFlightResult(flight) {
    return (
        '<div class="divResults" data-price="' + flight.price + '" data-duration="' + flight.duration + '">' +
        '<div id="airlineInfo">' +
        '<div class="airlineLogo">' +
        '<img src="https://s3-eu-west-1.amazonaws.com/sponsored-portal-uploads-prod/content%2F59fc2d71eb9f40813ba7ea9443e4bd00.png?publicName=ai-template-air-france-full-2-xxxhdpi.png" class="imgFrance">' +
        '</div>' +
        '<span class="airlineName">Travel to ' + landCountry + ' with ' + flight.airline + '</span>' +
        '</div>' +
        '<div id="flightInfo">' +
        '<div class="flightDetails">' +
        '<div id="departDetails">' +
        '<span id="departTime">' + flight.departure + '</span><br>' +
        '<span id="departLocation"> ' + departCountry + '</span>' +
        '</div>' +
        '<div>' +
        '<div id="horzLineFirst">' +
        '<span id="durationSpan1">' + flight.duration + 'Hr</span>' +
        '</div>' +
        '<i class="fa-solid fa-plane" id="planeLogo"></i>' +
        '</div>' +
        '<div id="DestDetails">' +
        '<span id="landTime">' + flight.arrival + '</span><br>' +
        '<span id="landLocation"> ' + landCountry + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="flightprice">' +
        '<span class="price">' + flight.price + '$</span><br><br>' +
        '<button class="selectButton">Select <i class="fa-solid fa-arrow-right" id="selectArrow"></i></button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
}

// Display number of results
var searchResultsDiv = document.getElementById('searchResults');
searchResultsDiv.innerHTML = filteredFlights.length + ' results';

// Display filtered flights
var resultsDiv = document.getElementById('resultsDiv');
for (var i = 0; i < filteredFlights.length; i++) {
    var flight = filteredFlights[i];
    var flightHTML = createFlightResult(flight);
    resultsDiv.innerHTML += flightHTML;
}



/* price range slider */
var priceSlider = document.getElementById('range3');
var priceDisplay = document.getElementById('priceRangeSpan');

function displayPrice() {
    var min = priceSlider.min;
    var max = priceSlider.max;
    var value = priceSlider.value;
    priceDisplay.innerHTML = value + '$';
};

/* Depart and return time slider */
function formatTime(minutes) {
    var hours = Math.floor(minutes / 60);
    var mins = minutes % 60;
    var formattedHours = hours.toString();
    var formattedMins = mins.toString();

    // Pad hours and minutes with leading zeros if necessary
    if (formattedHours.length < 2) {
        formattedHours = '0' + formattedHours;
    }
    if (formattedMins.length < 2) {
        formattedMins = '0' + formattedMins;
    }

    return formattedHours + ':' + formattedMins;
}

function updateDepartTime() {
    var departSlider = document.getElementById('range1');
    var departDisplay = document.getElementById('departTimeSpan');

    // Get the selected departure time in minutes
    var departTime = departSlider.value;

    // Format and display the selected time
    var formattedTime = formatTime(departTime);
    departDisplay.innerHTML = formattedTime;

    // Filter flights based on the selected departure time
    var filteredByDepartTime = filterFlightsByDepartTime(departTime);

    // Display the filtered flights
    displayFilteredFlights(filteredByDepartTime);

    // Update the number of results
    var searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = filteredByDepartTime.length + ' results';
}
/* filter depart time */
function convertTimeToMinutes(time) {
    var parts = time.split(':');
    var hours = parseInt(parts[0]);
    var minutes = parseInt(parts[1]);
    return hours * 60 + minutes;
}

function filterFlightsByDepartTime(departTime) {
    var filteredByDepartTime = [];
    for (var i = 0; i < filteredFlights.length; i++) {
        var flight = filteredFlights[i];
        var flightDepartTime = convertTimeToMinutes(flight.departure); // Convert flight departure time to minutes
        if (flightDepartTime <= departTime) {
            filteredByDepartTime.push(flight);
        }
    }
    return filteredByDepartTime;
}

/* return slider ghalbn hytlghy
 function updateReturnTime() {
    var returnSlider = document.getElementById('range2');
    var returnDisplay = document.getElementById('returnTimeSpan');

    var startTime = formatTime(returnSlider.value);
    returnDisplay.innerHTML = startTime;
} */


/* clear all and select all */
function selectAll() {
    var airlineCheckboxes = document.querySelectorAll('.checkBox');
    for (var checkbox of airlineCheckboxes) {
        checkbox.checked = true;
    }
    var filteredByAirlines = filterFlightsByAirlines();
    displayFilteredFlights(filteredByAirlines);
}
function clearAll() {
    var airlineCheckboxes = document.querySelectorAll('.checkBox');
    for (var checkbox of airlineCheckboxes) {
        checkbox.checked = false;
    }
    var filteredByAirlines = filterFlightsByAirlines();
    displayFilteredFlights(filteredByAirlines);
}

/* Toggle */
var icons = document.getElementsByClassName('fa-angle-down');
for (var i = 0; i < icons.length; i++) {
    var icon = icons[i];
    icon.onclick = function () {
        var optionsDiv = this.parentElement.nextElementSibling;
        if (optionsDiv.style.display === 'block') {
            optionsDiv.style.display = 'none';
        } else {
            optionsDiv.style.display = 'block';
        }
        this.classList.toggle('fa-angle-down');
        this.classList.toggle('fa-angle-up');
    };
}

/* drop down sorting */
// Reference to the sort dropdown and results container
var sortDropdown = document.getElementById('sortOptions');
var resultsDivv = document.getElementById('resultsDiv');
var results = document.getElementsByClassName('divResults');

// Listen for changes in the sort dropdown
sortDropdown.addEventListener('change', function () {
    var sortValue = sortDropdown.value;
    var resultsArray = []; // Convert NodeList to Array for sorting

    for (var i = 0; i < results.length; i++) {
        resultsArray.push(results[i]);
    }

    if (sortValue === 'Cheapest first') {
        resultsArray.sort(function (a, b) {
            return parseInt(a.dataset.price) - parseInt(b.dataset.price);
        });
    } else if (sortValue === 'Fastest first') {
        resultsArray.sort(function (a, b) {
            return parseInt(a.dataset.duration) - parseInt(b.dataset.duration);
        });
    }

    // Clear and append sorted results back to the container
    resultsDivv.innerHTML = ''; // Clear previous results
    for (var i = 0; i < resultsArray.length; i++) {
        resultsDivv.appendChild(resultsArray[i]);
    }
});

/* Price slider filtration */
function filterFlightsByPrice(price) {
    var filteredByPrice = [];
    for (var i = 0; i < filteredFlights.length; i++) {
        var flight = filteredFlights[i];
        if (flight.price <= price) {
            filteredByPrice.push(flight);
        }
    }
    return filteredByPrice;
}

function displayFilteredFlights(filteredFlights) {
    var resultsDiv = document.getElementById('resultsDiv');
    resultsDiv.innerHTML = ''; // Clear previous results

    for (var i = 0; i < filteredFlights.length; i++) {
        var flight = filteredFlights[i];
        resultsDiv.innerHTML += createFlightResult(flight);
    }

    // Update the number of results
    var searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = filteredFlights.length + ' results';
}

priceSlider.addEventListener('input', function () {
    var price = priceSlider.value;
    priceDisplay.innerHTML = price + '$'; // Update the displayed price

    // Filter flights based on the selected price (only from the already filtered flights)
    var filteredByPrice = filterFlightsByPrice(price);

    // Display the filtered flights
    displayFilteredFlights(filteredByPrice);

    // Update the number of results
    var searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = filteredByPrice.length + ' results';
});

/* checkbox filtration of airlines */
function filterFlightsByAirlines() {
    var airlineCheckboxes = document.querySelectorAll('.checkBox');
    var selectedAirlines = [];

    // Get the selected airlines
    for (var i = 0; i < airlineCheckboxes.length; i++) {
        if (airlineCheckboxes[i].checked) {
            selectedAirlines.push(airlineCheckboxes[i].name);
        }
    }

    // If no airlines are selected, return all flights
    if (selectedAirlines.length === 0) {
        return filteredFlights;
    }

    // Filter flights based on selected airlines
    var filteredByAirlines = [];
    for (var i = 0; i < filteredFlights.length; i++) {
        var flight = filteredFlights[i];
        if (selectedAirlines.indexOf(flight.airline) !== -1) {
            filteredByAirlines.push(flight);
        }
    }

    return filteredByAirlines;
}

var airlineCheckboxes = document.querySelectorAll('.checkBox');
for (var i = 0; i < airlineCheckboxes.length; i++) {
    airlineCheckboxes[i].addEventListener('change', function () {
        // Filter flights based on selected airlines
        var filteredByAirlines = filterFlightsByAirlines();

        // Display the filtered flights
        displayFilteredFlights(filteredByAirlines);
    });
}

/* checkbox filtration of stops */
function getStopType(stops) {
    if (stops === 'direct') return 'direct';
    if (stops === '1-stop') return 'oneStop';
    if (stops === '2-stops') return 'multipleStops';
    return '';
}

function filterFlightsByStops() {
    var stopCheckboxes = document.querySelectorAll('.checkBoxes');
    var selectedStops = [];

    // Get the selected stops
    for (var i = 0; i < stopCheckboxes.length; i++) {
        if (stopCheckboxes[i].checked) {
            selectedStops.push(stopCheckboxes[i].id); // Use the checkbox ID to identify the stop type
        }
    }

    // If no stops are selected, return all flights
    if (selectedStops.length === 0) {
        return filteredFlights;
    }

    // Filter flights based on selected stops
    var filteredByStops = [];
    for (var i = 0; i < filteredFlights.length; i++) {
        var flight = filteredFlights[i];
        if (selectedStops.indexOf(getStopType(flight.stops)) !== -1) {
            filteredByStops.push(flight);
        }
    }

    return filteredByStops;
}

var stopCheckboxes = document.querySelectorAll('.checkBoxes');
for (var i = 0; i < stopCheckboxes.length; i++) {
    stopCheckboxes[i].addEventListener('change', function () {
        // Filter flights based on selected stops
        var filteredByStops = filterFlightsByStops();

        // Display the filtered flights
        displayFilteredFlights(filteredByStops);
    });
}

/* price Alert function */
var modal = document.getElementById('priceAlertModal');
var priceBtn = document.getElementById('priceBtn');
var closeBtn = document.getElementsByClassName('close')[0];
var submitBtn = document.getElementById('submitEmail');

priceBtn.addEventListener('click',function(){
    modal.style.display = 'block';
})
closeBtn.addEventListener('click',function(){
    modal.style.display = 'none';
})

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Handle email submission
submitBtn.onclick = function () {
    var emailInput = document.getElementById('emailInput').value;

    // Validate the email
    if (emailInput && validateEmail(emailInput)) {
        alert('Thank you! You will receive price alerts at ' + emailInput);
        modal.style.display = 'none';
    } else {
        alert('Please enter a valid email address');
    }
};
function validateEmail(email){
    var regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regExp.test(email);
}