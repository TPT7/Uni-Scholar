function sendQuestion() {
    const question = document.getElementById('questionInput').value;

    fetch('http://localhost:3000/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Question sent successfully!');
        } else {
            alert('Failed to send question.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function toggleComments() {
    const commentSection = document.getElementById('commentSection');
    if (commentSection.style.display === 'none' || commentSection.style.display === '') {
        commentSection.style.display = 'block';
    } else {
        commentSection.style.display = 'none';
    }
}

function addComment() {
    const comment = document.getElementById('commentInput').value;

    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const commentSection = document.getElementById('commentSection');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = '<p>' + comment + '</p>';
            commentSection.insertBefore(newComment, commentSection.childNodes[2]);
            document.getElementById('commentInput').value = '';
        } else {
            alert('Failed to add comment.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

//login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            // Redirect to the homepage or another page
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
    });
}

//signup
function register() {
    const username = document.getElementById('usernames').value;
    const password = document.getElementById('passwords').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
            // Redirect to the login page or another page
            window.location.href = 'login.html';
        } else {
            alert('Failed to register.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


