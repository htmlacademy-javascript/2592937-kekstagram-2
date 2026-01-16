const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;
  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;
  commentElement.appendChild(img);
  commentElement.appendChild(text);
  return commentElement;
};
const closeFullSizeModal = () => {
  const fullSizeOverlay = document.querySelector('.big-picture');
  const body = document.body;
  fullSizeOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullSizeModal();
  }
};
const openFullSize = (photo) => {
  const fullSizeOverlay = document.querySelector('.big-picture');
  const body = document.body;
  const closeButton = fullSizeOverlay.querySelector('#picture-cancel');
  const fullSizeImage = fullSizeOverlay.querySelector('.big-picture__img img');
  fullSizeImage.src = photo.url;
  fullSizeImage.alt = photo.description;
  fullSizeOverlay.querySelector('.social__caption').textContent = photo.description;
  fullSizeOverlay.querySelector('.likes-count').textContent = photo.likes;
  const commentsContainer = fullSizeOverlay.querySelector('.social__comments');
  const commentsShownCount = fullSizeOverlay.querySelector('.social__comment-shown-count');
  const commentsTotalCount = fullSizeOverlay.querySelector('.social__comment-total-count');
  commentsContainer.innerHTML = '';
  photo.comments.forEach(comment => {
    commentsContainer.appendChild(createCommentElement(comment));
  });
  commentsShownCount.textContent = photo.comments.length;
  commentsTotalCount.textContent = photo.comments.length;
  fullSizeOverlay.querySelector('.social__comment-count').classList.add('hidden');
  fullSizeOverlay.querySelector('.comments-loader').classList.add('hidden');
  fullSizeOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', closeFullSizeModal);
  document.addEventListener('keydown', onDocumentKeydown);
};
export { openFullSize };
