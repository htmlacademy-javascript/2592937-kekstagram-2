import { init as initModal, closePhotoEditor, setPristine } from './modal.js';
import { init as initScale } from './scale.js';
import { init as initEffects } from './effects.js';
import { validateHashtags, getHashtagErrorMessage, validateComment, getCommentErrorMessage } from './validation.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
}, true);

setPristine(pristine);

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  submitButton.disabled = true;
  sendData(new FormData(uploadForm))
    .then(() => {
      showSuccessMessage();
      closePhotoEditor();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      submitButton.disabled = false;
    });
};

export const initUploadModal = () => {
  pristine.addValidator(
    uploadForm.querySelector('.text__hashtags'),
    validateHashtags,
    getHashtagErrorMessage,
    1,
    false
  );
  pristine.addValidator(
    uploadForm.querySelector('.text__description'),
    validateComment,
    getCommentErrorMessage,
    1,
    false
  );

  initModal();
  initScale();
  initEffects();
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};
