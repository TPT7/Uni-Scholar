function sendQuestion() {
    const question = document.getElementById('questionInput').value;

    fetch('/questions', {
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

    fetch('/comments', {
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