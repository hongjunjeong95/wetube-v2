import axios from 'axios';

const commentContainer = document.getElementById('jsCommentContainer');
const commentForm = document.getElementById('jsCommentForm');
const commentTextarea = document.getElementById('jsCommentTextarea');

const sendComment = (comment) => {
  const videoId = window.location.href.split('/videos/')[1];
  console.log(comment);
  axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: { comment },
  });
};

const handleCommentSubmit = (event) => {
  event.preventDefault();
  const comment = commentTextarea.value;
  sendComment(comment);
  commentTextarea.value = '';
};

const handleCommentClick = () => {
  console.log(document.cookie('connect.sid'));
};

const init = () => {
  commentForm.addEventListener('submit', handleCommentSubmit);
  commentForm.addEventListener('click', handleCommentClick);
};

if (commentContainer) {
  init();
}
