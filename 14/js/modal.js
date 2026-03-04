import { isEscapeKey } from './utils.js';
import { reset as resetScale } from './scale.js';
import { reset as resetEffects } from './effects.js';

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

const closePhotoEditor = () => {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetButton.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadForm.reset();
  uploadFileControl.value = '';
  pristine?.reset();
  resetScale();
  resetEffects();
  previewImage.style.filter = '';
  previewImage.className = '';
};

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }
    evt.preventDefault();
    closePhotoEditor();
  }
};

const openPhotoEditor = () => {
  photoEditorForm.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  resetScale();
  resetEffects();
  photoEditorResetButton.addEventListener('click', onPhotoEditorResetBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const init = () => {
  uploadFileControl.addEventListener('change', openPhotoEditor);
};

export { init, closePhotoEditor, setPristine };
