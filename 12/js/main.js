import { generatePhotos } from './mock.js';
import { renderPictures } from './gallery.js';
import { initUploadModal } from './upload.js';
const photos = generatePhotos();
renderPictures(photos);
initUploadModal();
