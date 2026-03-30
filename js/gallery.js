import { openFullSize } from './full-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');

const handlePictureClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (!pictureElement) {
    return;
  }

  evt.preventDefault();

  const index = parseInt(pictureElement.dataset.id, 10);
  const container = evt.currentTarget;

  if (container.photos && container.photos[index]) {
    openFullSize(container.photos[index]);
  }
};

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();
  const template = pictureTemplate;

  const oldPictures = picturesContainer.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());

  picturesContainer.removeEventListener('click', handlePictureClick);

  photos.forEach((photo, index) => {
    const pictureElement = template.content.cloneNode(true);
    const link = pictureElement.querySelector('.picture');
    const img = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');

    link.dataset.id = index;
    img.src = photo.url;
    img.alt = photo.description;
    likesElement.textContent = photo.likes;
    commentsElement.textContent = photo.comments.length;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
  picturesContainer.photos = photos;
  picturesContainer.addEventListener('click', handlePictureClick);
};

export { renderPictures };
