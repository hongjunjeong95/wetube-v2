import axios from 'axios';

const commentContainer = document.getElementById('jsCommentContainer');
const commentForm = document.getElementById('jsCommentForm');
const commentTextarea = document.getElementById('jsCommentTextarea');
const deleteComments = document.querySelectorAll('.jsDeleteComment');
const commentCntCLASS = commentContainer.getElementsByClassName(
  'comments__cnt'
);
let commentCnt = 0;

const sendComment = (comment) => {
  const videoId = window.location.href.split('/videos/')[1];
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
  console.log('hi');
  console.log(document.cookie('connect.sid'));
};

const deleteElement = (event) => {
  const form = event.target;
  const column = form.parentNode;
  const li = column.parentNode;
  const ul = li.parentNode;
  ul.removeChild(li);
};

const renewalCommentCnt = () => {
  commentCnt = parseInt(commentCntCLASS[0].textContent.split(' ')[0], 10);
  commentCnt--;
  console.log(commentCntCLASS[0].innerText);
  if (commentCnt === 1) commentCntCLASS[0].innerText = '1 comment';
  else commentCntCLASS[0].innerText = `${commentCnt} comments`;
};

const handleDeleteComment = (event) => {
  event.preventDefault();
  const videoId = window.location.href.split('/videos/')[1];
  const form = event.target;
  const input = form.querySelector('input');
  const id = input.name;

  axios({
    url: `/api/${videoId}/comment/delete`,
    method: 'POST',
    data: { id },
  });

  renewalCommentCnt();

  deleteElement(event);
};

const init = () => {
  console.log(deleteComments);
  commentForm.addEventListener('submit', handleCommentSubmit);
  // commentForm.addEventListener('click', handleCommentClick);
  deleteComments.forEach((deleteComment) =>
    deleteComment.addEventListener('submit', handleDeleteComment)
  );
};

if (commentContainer) {
  init();
}
