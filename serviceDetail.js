// Get the service id from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get('id');

let user = JSON.parse(localStorage.getItem('user'));
console.log(user.id);
// Get the value stored in local storage
let userID = user.id;

// Make a GET request to fetch the service details
fetch(`http://localhost:8080/api/service/${serviceId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch service details');
    }
    return response.json();
  })
  .then(data => {
    // Store the service details in local storage
    localStorage.setItem('service', JSON.stringify(data));

    // Display the service details on the page
    document.getElementById('id').innerText = data.id;
    document.getElementById('name').innerText = data.name;
    document.getElementById('price').innerText = data.price;
    document.getElementById('userID').innerText = data.uid;
    document.getElementById('description').innerText = data.description;

    // Add event listener to the "Order" button
    const orderButton = document.querySelector('.custom-btn');
    orderButton.addEventListener('click', () => {
      // Confirm the order with the user
      const confirmed = confirm('Are you sure you want to place this order?');
      if (confirmed) {
        // Retrieve the service details from local storage
        const service = JSON.parse(localStorage.getItem('service'));

        // Create a transaction object
        const transaction = {
          uid: userID,
          sid: service.uid, // Use the uid from local storage as the sid
          name: service.name,
          status: "Pending"
        };

        // Make a POST request to create a new transaction
        fetch('http://localhost:8080/api/transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(transaction)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to create transaction');//
            }
            return response.json();
          })
          .then(data => {
            // Handle the response from the backend
            console.log('Transaction created:', data);
            alert('Transaction successful!'); // Display success message
          })
          .catch(error => {
            console.error('Error creating transaction:', error);
            alert('Transaction failed. Please try again.'); // Display error message
          });
      }
    });
  })
  .catch(error => {
    console.error('Error fetching service details:', error);
    // Handle the error scenario
  });

  document.getElementById("sellerInfoButton").addEventListener("click", function() {
    event.preventDefault();
    let sellerId = document.getElementById("userID").innerText;
    console.log(sellerId);
    let buyerId = userID;
    
    // Check if the sellerId is the same as the buyerId
    if (sellerId == buyerId) {
        // Redirect to the user's own profile page
        window.location.href = "userprofile.html";
    } else {
        // Redirect to the otherProfile.html page with the user ID in the URL parameters
        window.location.href = `otherProfile.html?id=${sellerId}`;
    }
});


