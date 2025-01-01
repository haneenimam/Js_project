// Extract flight details from URL parameters
var urlParams = new URLSearchParams(window.location.search);
var airline = decodeURIComponent(urlParams.get('airline'));
var departure = decodeURIComponent(urlParams.get('departure'));
var departCountry = decodeURIComponent(urlParams.get('departCountry'));
var arrival = decodeURIComponent(urlParams.get('arrival'));
var landCountry = decodeURIComponent(urlParams.get('landCountry'));
var duration = decodeURIComponent(urlParams.get('duration'));
var price = decodeURIComponent(urlParams.get('price'));

// Display flight details
var flightDetails = document.getElementById('flightDetails');
flightDetails.innerHTML = `
    <h3>Flight Details</h3>
    <p><strong>Airline:</strong> ${airline}</p>
    <p><strong>Departure:</strong> ${departure} (${departCountry})</p>
    <p><strong>Arrival:</strong> ${arrival} (${landCountry})</p>
    <p><strong>Duration:</strong> ${duration} hours</p>
    <p><strong>Price:</strong> ${price}$</p>
`;

// Handle payment form submission
document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Payment successful.Thank you for booking with us');
    window.location.href = 'file:///D:/ITI(mern)/Javascript/Final_Project/booking2/index.html'; // Redirect to home page after payment
});