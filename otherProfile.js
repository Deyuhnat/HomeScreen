const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

let user = JSON.parse(localStorage.getItem('user'));

let userID = user.id;


function orderService() {
  // Get the user id. This depends on how the user id is displayed on your page.
  var uid = document.getElementById('id').innerText;
  window.location.href = 'orderservice.html?uid=' + uid;
}

fetch(`http://localhost:8080/api/users/${userId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    return response.json();
  })
  .then(data => {


    document.getElementById('id').innerText = data.id;
    document.getElementById('name').innerText = data.username;
    document.getElementById('email').innerText = data.email;
    document.getElementById('description').innerText = data.bio;
    document.getElementById('orderService').href += data.id;

  });
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
})
