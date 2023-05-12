
  
  document.querySelector('#profilePictureInput').addEventListener('change', (event) => {
    // Get the selected file
    let file = event.target.files[0];
  
    // Create a FileReader object
    let reader = new FileReader();
  
    // Set the onload event of the FileReader object
    reader.onload = (event) => {
      // Update the src attribute of the img element with the data URL of the selected file
      let dataURL = event.target.result;
      document.querySelector('img').src = dataURL;
  
      // Store the data URL of the selected file in local storage
      localStorage.setItem('profilePicture', dataURL);
    };
  
    // Read the selected file as a data URL
    reader.readAsDataURL(file);
  });
  
  window.addEventListener('load', () => {
    // Get the value stored in local storage
    let dataURL = localStorage.getItem('profilePicture');
  
    // Check if a value was stored in local storage
    if (dataURL) {
      // Set the src attribute of the img element to the value stored in local storage
      document.querySelector('img').src = dataURL;
    }
  });