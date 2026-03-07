import { isEscapeKey } from './utils.js';
import { reset as resetScale } from './scale.js';
import { reset as resetEffects } from './effects.js';
import { clearPreview } from './upload.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetButton = photoEditorForm.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img');

let pristine = null;

const setPristine = (instance) => {
  pristine = instance;
};

const api = {
  close: null,
  onPhotoEditorResetBtnClick: null,
  onDocumentKeydown: null,
};

api.close = () => {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', api.onDocumentKeydown);
  photoEditorResetButton.removeEventListener('click', api.onPhotoEditorResetBtnClick);
  uploadForm.reset();
  uploadFileControl.value = '';
  pristine?.reset();
  resetScale();
  resetEffects();
  previewImage.computedStyleMap.filter = '';
  previewImage.className = '';
  clearPreview();
};

api.onPhotoEditorResetBtnClick = () => {
  api.close();
};

api.onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.querySelector('.error') || document.querySelector('.success')) {
      return;
    }

    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }
    evt.preventDefault();
    api.close();
  }
};

const openPhotoEditor = () => {
  photoEditorForm.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  resetScale();
  resetEffects();
  photoEditorResetButton.addEventListener('click', api.onPhotoEditorResetBtnClick);
  document.addEventListener('keydown', api.onDocumentKeydown);
};

const init = () => {
  uploadFileControl.addEventListener('change', openPhotoEditor);
};

const closePhotoEditor = api.close;
export { init, closePhotoEditor, setPristine };
