import { init as initModal, closePhotoEditor, setPristine } from './modal.js';
import { init as initScale } from './scale.js';
import { init as initEffects } from './effects.js';
import { validateHashtags, getHashtagErrorMessage, validateComment, getCommentErrorMessage } from './validation.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error-text',
}, true);

setPristine(pristine);

const showPreview = (file) => {
  const objectUrl = URL.createObjectURL(file);
  previewImage.src = objectUrl;

  previewImage.datast.objectUrl = objectUrl;
};

const clearPreview = () => {
  if (previewImage.dataset.objectUrl) {
    URL.revokeObjectURL(previewImage.dataset.objectUrl);
    delete previewImage.dataset.objectUrl;
  }
  previewImage.src = 'img/upload-default-image.jpg';
  effectLevelValue.value = '';
};

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

  uploadFileControl.addEventListener('change', () => {
    const file = uploadFileControl.files[0];
    if (file) {
      showPreview(file);
    }
  });

  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export { clearPreview };
