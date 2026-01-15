import { openFullSize } from "./full-picture.js";
const renderPictures = (photos) => {
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#picture');

  photos.forEach((photo) => {
    const pictureElement = template.content.cloneNode(true);
    const link = pictureElement.querySelector('.picture');
    const img = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');
    img.src = photo.url;
    img.alt = photo.description;
    likesElement.textContent = photo.likes;
    commentsElement.textContent = photo.comments.length;
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullSize(photo);
    });
    fragment.appendChild(pictureElement);
  });
  container.appendChild(fragment);
};
export { renderPictures };
