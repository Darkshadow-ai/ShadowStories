document.addEventListener('DOMContentLoaded', async () =>
    {
        const token = localStorage.getItem('token');
        //redirect logged-in users to dashboard
        if (token) {
            window.location.href = '/dashboard.html';
            return;
        }
        //fetch and display public stories
        const response = await
        fetch('https://localhost:5000/stories');
            const stories =await response.json();
            const storyContainer = document.getElementById('public-stories');

            stories.forEach(story => {
                const storyCard = document.createElement('div');

                storyCard.classList.add('story-card');
                storyCard.innerHTML = `<h3>${story.title}</h3><p>${story-content}</p>`;

            storyContainer.appendChild(storyCard);
            });
    });