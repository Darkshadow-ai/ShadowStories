// Fetch user's stories after login
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';  // Redirect to login if no token
        return;
    }

    const response = await fetch('https://shadow-stories-backend.onrender.com', {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        },
    });

    const data = await response.json();
    const dashboardContainer = document.querySelector('.dashboard-container');

    if (response.ok) {
        data.forEach(story => {
            const storyCard = document.createElement('div');
            storyCard.classList.add('story-card');
            storyCard.innerHTML = `
                <h3>${story.title}</h3>
                <p>${story.content}</p>
                <button class="delete-btn" data-id="${story._id}">Delete</button>
            `;
            dashboardContainer.appendChild(storyCard);
        });

        // Add event listener to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const storyId = button.getAttribute('data-id');
                const deleteResponse = await fetch(`http://localhost:5000/story/${storyId}`, {
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': token,
                    },
                });

                const deleteData = await deleteResponse.json();
                if (deleteResponse.ok) {
                    alert(deleteData.message);
                    window.location.reload(); // Reload to update the list
                } else {
                    alert(deleteData.error);
                }
            });
        });
    } else {
        alert(data.error);  // Show error if unable to fetch stories
    }
});

document.getElementById('story-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('story-title').value;
    const content = document.getElementById('story-content').value;
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
        alert('Story submitted successfully!');
        window.location.reload(); // Refresh stories
    } else {
        alert('Failed to submit story');
    }
});
