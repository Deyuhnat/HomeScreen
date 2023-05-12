window.addEventListener('load', () => {
    // Get the value stored in local storage
    let data = localStorage.getItem('data');
    console.log(data);
  
    // Check if a value was stored in local storage
    if (data) {
      // Parse the JSON string to an object
      data = JSON.parse(data);
  
      // Set the text content of the elements to the values stored in local storage
      document.querySelector('#userID').textContent = data.userID;
      document.querySelector('#name').textContent = data.fullname;
      document.querySelector('#price').textContent = data.price;
      document.querySelector('#description').textContent = data.description;
    }
  });
  