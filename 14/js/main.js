import { renderPictures } from './gallery.js';
import { initUploadModal } from './upload.js';
import { getData } from './api.js';
import { showErrorMessage } from './message.js';
import { init as initFilters } from './filters.js';

initUploadModal();

getData()
  .then((photos) => {
    renderPictures(photos);
    initFilters(photos);
  })
  .catch((err) => {
    console.error(err.message);
    showErrorMessage();
  });
