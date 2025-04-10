document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://shadow-stories-backend.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);  // Save token in localStorage
        window.location.href = '/dashboard.html';   // Redirect to dashboard
    } else {
        alert(data.error);  // Display error message if login fails
    }
});
