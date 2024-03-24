// Function to fetch nearest police station using Google Maps Places API
async function findNearestPoliceStation(latitude, longitude) {
    const apiKey = 'Your_api_key'; // Replace with your own Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=police&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const nearestStation = data.results[0];
            return {
                name: nearestStation.name,
                latitude: nearestStation.geometry.location.lat,
                longitude: nearestStation.geometry.location.lng
            };
        } else {
            throw new Error('No police stations found nearby');
        }
    } catch (error) {
        throw error;
    }
}

// Function to handle form submission
function submitReport(form) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the form data
    const formData = new FormData(form);

    // Send a POST request to the server
    fetch('/api/v1/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Report submitted successfully
            console.log('Report submitted successfully');
            // You can redirect to another page or show a success message here
        } else {
            // Report submission failed
            console.error('Report submission failed');
            // You can handle the failure here, such as showing an error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // You can handle errors here, such as showing an error message
    });
}

// Function to handle form submission and show nearest police station
async function submitReportAndShowNearestStation(form) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the form data
    const formData = new FormData(form);

    // Send a POST request to the server
    fetch('/api/v1/submit', {
        method: 'POST',
        body: formData
    })
    .then(async response => {
        if (response.ok) {
            // Report submitted successfully, now find and show the nearest police station
            const userLat = parseFloat(formData.get('latitude'));
            const userLon = parseFloat(formData.get('longitude'));
            try {
                const nearestPoliceStation = await findNearestPoliceStation(userLat, userLon);
                alert(`Nearest Police Station:\nName: ${nearestPoliceStation.name}\nLatitude: ${nearestPoliceStation.latitude}\nLongitude: ${nearestPoliceStation.longitude}`);
            } catch (error) {
                console.error('Error:', error);
                alert('Error finding nearest police station. Please try again later.');
            }
        } else {
            // Report submission failed
            console.error('Report submission failed');
            // You can handle the failure here, such as showing an error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // You can handle errors here, such as showing an error message
    });
}
