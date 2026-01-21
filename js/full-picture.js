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

let currentComments = [];
let shownCommentsCount = 0;
const COMMENTS_PER_LOAD = 5;

const renderCommentsBatch = (container) => {
  const fragment = document.createDocumentFragment();
  const endIndex = Math.min(shownCommentsCount + COMMENTS_PER_LOAD, currentComments.length);

  for (let i = shownCommentsCount; i < endIndex; i++) {
    fragment.appendChild(createCommentElement(currentComments[i]));
  }

  container.appendChild(fragment);
  shownCommentsCount = endIndex;
};

const updateCommentsCount = (commentsShownCountElement, commentsTotalCountElement) => {
  commentsShownCountElement.textContent = shownCommentsCount;
  commentsTotalCountElement.textContent = currentComments.length;
};

const updatePhotoInfo = (photo, image, caption, likesCount) => {
  image.src = photo.url;
  image.alt = photo.description;
  caption.textContent = photo.description;
  likesCount.textContent = photo.likes;
};

const showModalElements = (fullSizeOverlay) => {
  fullSizeOverlay.querySelector('.social__comment-count').classList.remove('hidden');
  fullSizeOverlay.querySelector('.comments-loader').classList.remove('hidden');
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullSizeModal();
  }
};

const onCloseButtonClick = () => {
  closeFullSizeModal();
};

const onCommentsLoaderClick = (evt, commentsContainer, commentsShownCountElement, commentsTotalCountElement, loaderButton) => {
  evt.preventDefault();
  renderCommentsBatch(commentsContainer);
  updateCommentsCount(commentsShownCountElement, commentsTotalCountElement);

  if (shownCommentsCount >= currentComments.length) {
    loaderButton.classList.add('hidden');
  }
};

const removeModalListeners = (closeButton, loaderButton) => {
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  if (loaderButton) {
    loaderButton.removeEventListener('click', loaderButton._clickHandler);
  }
};

const setupModalListeners = (closeButton, loaderButton, commentsContainer, commentsShownCountElement, commentsTotalCountElement) => {
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  if (loaderButton) {
    const handler = (evt) => {
      onCommentsLoaderClick(evt, commentsContainer, commentsShownCountElement, commentsTotalCountElement, loaderButton);
    };
    loaderButton._clickHandler = handler;
    loaderButton.addEventListener('click', handler);
  }
};

function closeFullSizeModal() {
  const fullSizeOverlay = document.querySelector('.big-picture');
  const body = document.body;
  const closeButton = fullSizeOverlay.querySelector('#picture-cancel');
  const loaderButton = fullSizeOverlay.querySelector('.comments-loader');

  removeModalListeners(closeButton, loaderButton);

  fullSizeOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  currentComments = [];
  shownCommentsCount = 0;
}

const openFullSize = (photo) => {
  const fullSizeOverlay = document.querySelector('.big-picture');
  const body = document.body;
  const closeButton = fullSizeOverlay.querySelector('#picture-cancel');
  const fullSizeImage = fullSizeOverlay.querySelector('.big-picture__img img');
  const caption = fullSizeOverlay.querySelector('.social__caption');
  const likesCount = fullSizeOverlay.querySelector('.likes-count');
  const commentsContainer = fullSizeOverlay.querySelector('.social__comments');
  const commentsShownCountElement = fullSizeOverlay.querySelector('.social__comment-shown-count');
  const commentsTotalCountElement = fullSizeOverlay.querySelector('.social__comment-total-count');
  const loaderButton = fullSizeOverlay.querySelector('.comments-loader');

  commentsContainer.innerHTML = '';
  currentComments = photo.comments;
  shownCommentsCount = 0;

  updatePhotoInfo(photo, fullSizeImage, caption, likesCount);
  showModalElements(fullSizeOverlay);

  renderCommentsBatch(commentsContainer);
  updateCommentsCount(commentsShownCountElement, commentsTotalCountElement);

  if (currentComments.length <= COMMENTS_PER_LOAD) {
    loaderButton.classList.add('hidden');
  } else {
    loaderButton.classList.remove('hidden');
  }

  fullSizeOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  setupModalListeners(closeButton, loaderButton, commentsContainer, commentsShownCountElement, commentsTotalCountElement);
};

export { openFullSize };
