import { renderPictures } from './gallery.js';
import { initUploadModal } from './upload.js';
import { getData } from './api.js';
import { showErrorMessage, showDataError } from './message.js';
import { initFilters } from './filters.js';

initUploadModal();

getData()
  .then((photos) => {
    renderPictures(photos);
    initFilters(photos);
  })
  .catch(() => {
    showDataError();
  });
