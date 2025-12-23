const renderPitures = (photos) => {
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#picture');

  photos.forEach((photo) => {
    const pictureElement = template.content.cloneNode(true);
    const img = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');
    img.src = photo.url;
    img.alt = photo.description;
    likesElement.textContent = photo.likes;
    commentsElement.textContent = photo.comments.length;
    fragment.appendChild(pictureElement);
  });
  container.appendChild(fragment);
};
export {renderPitures};
