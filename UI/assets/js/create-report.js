// /* eslint-disable no-unused-vars, no-undef */
// let reportID;
// let url;
// let uploaded;

// function submitReport(form) {
//   const param = new FormData(form);

//   if (param.get('type')) {
//     param.append('location', `${param.get('latitude')},${param.get('longitude')}`);

//     toggleLoader(form);
//     Select('#resultPane').empty();

//     url = param.get('type') === CONSTANTS.INCIDENT.RED_FLAG ? CONSTANTS.URL.RED_FLAGS : CONSTANTS.URL.INTERVENTIONS;

//     queryAPI(url, 'POST', param, (json) => {
//       if (json.status === CONSTANTS.STATUS.CREATED) {
//         Select('form').addClass('hidden');
//         Select('.upload-wrapper').removeClass('hidden');
//         Select('.indicator span:first-child').html('<i class="fa fa-check"></i>').next().addClass('active');
//         Select('.heading').scroll();
//         const { id, message } = json.data[0];
//         Dialog.showNotification(message);
//         reportID = id;
//       } else {
//         const { error } = json;
//         Dialog.showMessageDialog('', error, 'error');
//         echo('', error);
//       }
//     }, () => {
//       Dialog.showMessageDialog('Server Error!', CONSTANTS.MESSAGE.ERROR, 'error');
//     }, () => {
//       toggleLoader(form);
//     });
//   } else {
//     Dialog.showMessageDialog('', ['Please choose the type of report you are trying to make.'], 'error');
//     Select('#resultPane').scroll();
//   }

//   return false;
// }

// function uploadFile(element) {
//   const file = new File(element.files[0]);
//   file.process(url, reportID, () => {
//     if (!uploaded) {
//       Select('.btn-skip').removeClass('btn-secondary').html('Done <i class="fa fa-angle-double-right"></i>');
//     }
//     uploaded = true;
//   });
// }

// init();
// Add an event listener to the form submission
// Function to display nearest police station
async function showNearestPoliceStation() {
    const userLat = parseFloat(document.querySelector('textarea[name="address"]').value);
    const userLon = parseFloat(document.querySelector('input[name="longitude"]').value);
    
    try {
        // Fetch nearest police station using Google Maps API
        const nearestPoliceStation = await findNearestPoliceStation(userLat, userLon);
        alert(`Nearest Police Station:\nName: ${nearestPoliceStation.name}\nAddress: ${nearestPoliceStation.address}`);
        
        // Perform the case transfer logic here
        // You can send another request to your backend API to transfer the case to the nearest police station
        // Example: await transferCase(nearestPoliceStation);
    } catch (error) {
        console.error('Error:', error);
        alert('Error finding nearest police station. Please try again later.');
    }
}

// Function to fetch nearest police station using Google Maps API
async function findNearestPoliceStation(latitude, longitude) {
    const apiKey = 'AIzaSyDonfh3Mmott1scvYYHADmM_U_wFgiIP7g'; // Replace with your own API key
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=police&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const nearestStation = data.results[0];
            return {
                name: nearestStation.name,
                address: nearestStation.vicinity
            };
        } else {
            throw new Error('No police stations found nearby');
        }
    } catch (error) {
        throw error;
    }
}
