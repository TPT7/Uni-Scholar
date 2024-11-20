//home
function sendQuestion() {
    const question = document.getElementById('questionInput').value;
    alert('Question sent: ' + question);
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
    if (comment) {
        const commentSection = document.getElementById('commentSection');
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = '<p>' + comment + '</p>';
        commentSection.insertBefore(newComment, commentSection.childNodes[2]);
        document.getElementById('commentInput').value = '';
    }
}
function likeAnswer() {
    alert('You liked this answer.');
}
function dislikeAnswer() {
    alert('You disliked this answer.');
}
function commentAnswer() {
    const comment = prompt('Enter your comment:');
    if (comment) {
        alert('Comment added: ' + comment);
    }
}



