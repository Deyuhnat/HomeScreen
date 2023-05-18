// Get DOM elements
const loginButton = document.querySelector('#login .input-submit');
const registerButton = document.querySelector('#register .input-submit');

// Add event listeners
loginButton.addEventListener('click', handleLogin);
registerButton.addEventListener('click', handleRegister);

// Login function
async function handleLogin(event) {
    event.preventDefault();

    const username = document.querySelector('#logEmail').value;
    const password = document.querySelector('#logPassword').value;

    try {
        const response = await fetch('http://localhost:8080/api/userLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}&password=${password}`,
        });

        if (response.ok) {
            const data = await response.json();
            alert('Logged in successfully');

            // Save user data to local storage
            localStorage.setItem('user', JSON.stringify(data));

            // Redirect to user profile page
            window.location.href = 'userprofile.html';
        } else {
            alert('Login failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
//Check username exist function
async function isUsernameExists(username) {
    try {
        const response = await fetch(`http://localhost:8080/api/userExist?username=${username}`);

        if (response.ok) {
            const data = await response.json();
            return data.Status === 'true';
        } else {
            throw new Error('Error fetching username');
        }
    } catch (error) {
        alert('Error: ' + error.message);
        return false;
    }
}

// Register function
async function handleRegister(event) {
    event.preventDefault();

    const username = document.querySelector('#regUser').value;
    const email = document.querySelector('#regEmail').value;
    const password = document.querySelector('#regPassword').value;
    const confirmPassword = document.querySelector('#regConfirmPassword').value;

    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
        alert('Username already exists');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                bio: ""
            })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Registered successfully');
        } else {
            if (response.status === 500) {
                alert('Registration failed: Internal Server Error');
            } else {
                const errorData = await response.json();
                alert('Registration failed: ' + JSON.stringify(errorData));
            }
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}




