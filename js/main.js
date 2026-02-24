import { renderPictures } from './gallery.js';
import { initUploadModal } from './upload.js';
import { getData } from './api.js';

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error');
  if (errorTemplate) {
    const errorElement = errorTemplate.textContent.cloneNode(true);
    document.body.appendChild(errorElement);

    setTimeout(() => {
      const error = document.querySelector('.data-error');
      if (error) {
        error.remove();
      }
    }, 5000);
  }
};

initUploadModal();

getData()
  .then((photos) => {
    renderPictures(photos);
  })
  .catch((err) => {
    console.error(err.message);
    showErrorMessage();
  });
