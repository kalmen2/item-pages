// script.js

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form data
    const orderNumber = document.getElementById('orderNumber').value;
    const status = document.getElementById('status').value;

    // Prepare data to send in the POST request
    const data = {
        orderNumber: orderNumber,
        status: status
    };

    // The URL of your Google Apps Script (replace with your deployed URL)
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzbx4XvFa3wWvxqD8-aQaF2ZqXnkpuFL4ezKzfBrHRjXWgi3hlnrcQ1r3i81rl3UBQj/exec';

    // Send the POST request to Google Apps Script
    fetch(scriptUrl, {
        method: 'POST', // POST method
        headers: {
            'Content-Type': 'application/json' // Tell the server the body content type is JSON
        },
        body: JSON.stringify(data) // Convert the data to a JSON string
    })
    .then(response => response.json()) // Parse the JSON response
    .then(result => {
        // Handle successful response
        console.log('Success:', result);
        alert('Data submitted successfully!');
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        alert('Error submitting data.');
    });
});
