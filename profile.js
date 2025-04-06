document.getElementById('profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
    });

    if (response.ok) {
        alert('Profile updated successfully!');
    } else {
        alert('Failed to update profile');
    }
});
