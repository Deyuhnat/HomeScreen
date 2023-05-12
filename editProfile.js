const BASE_URL = 'http://localhost:8080/api'; // Add your backend base URL here

const saveBtn = document.getElementById('savebtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const bioDescriptionInput = document.getElementById('bio_description');

const user = JSON.parse(localStorage.getItem('user'));

async function checkUsernameAvailability(username) {
    const response = await fetch(`${BASE_URL}/userExist?username=${username}`);
    const data = await response.json();
    return data.Status === 'false';
}

async function updateUserProfile(id, updatedProfile) {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
    });

    return response.json();
}

saveBtn.addEventListener('click', async () => {
    const newUsername = usernameInput.value.trim() || user.username;
    const newPassword = passwordInput.value.trim() || user.password;
    const newEmail = emailInput.value.trim() || user.email;
    const newBioDescription = bioDescriptionInput.value.trim() || user.bio;

    if (newUsername !== user.username) {
        const isUsernameAvailable = await checkUsernameAvailability(newUsername);
        if (!isUsernameAvailable) {
            alert('Username already exists. Please choose a different one.');
            return;
        }
    }

    const updatedProfile = {
        ...user,
        username: newUsername,
        password: newPassword,
        email: newEmail,
        bio: newBioDescription,
    };

    const shouldUpdate = confirm('Are you sure you want to update your profile?');

    if (shouldUpdate) {
        try {
            const updatedUser = await updateUserProfile(user.id, updatedProfile);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert('Profile updated successfully.');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again later.');
        }
    }
});
