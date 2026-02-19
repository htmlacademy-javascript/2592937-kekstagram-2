import { isEscapeKey } from "./utils";

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl =uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetButton = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const HASHTAG_PATTERN = /^#[a-za-яё0-9]{1,19}$/i;

const getHashtags = (value) => {
  if (!value.trim()) {
    return [];
  }
  return value.trim().split(/\s+/);
};

const validateHashtags = (value) => {
  const hashtags = getHashtags(value);
  if (hashtags.length === 0) {
    return true;
  }
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return false;
  }
  const seen = new Set();
  for (const tag of hashtags) {
    const lowerTag = tag.toLowerCase();
    if (seen.has(lowerTag)) {
      return false;
    }
    seen.add(lowerTag);
    if (!HASHTAG_PATTERN.test(tag)) {
      return false;
    }
    if (tag.length > MAX_HASHTAG_LENGTH) {
      return false;
    }
  }
  return true;
}

const getHashtagErrorMessage = (value) => {
  const hashtags = getHashtags(value);
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return `Нельзя указывать больше ${MAX_HASHTAGS_COUNT} хэштегов`;
  }
  const seen = new Set();
  for (const tag of hashtags) {
    const lower = tag.toLowerCase();
    if (seen.has(lower)) {
      return 'Хэштеги не должны повторяться (нечувствительно к регистру)';
    }
    seen.add(lower);
    if (!HASHTAG_PATTERN.test(tag)) {
      if (tag === '#') {
        return 'Хэштег не может состоять только из решетки';
      }
      if (!/^#/.test(tag)) {
        return 'Хэштег должен начинаться с симовола #';
      }
      return 'Хэштег может содержать только буквы и цифры'
    }
    if (tag.length > MAX_HASHTAG_LENGTH) {
      return `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов (включая #)`;
    }
  }
  return 'Некорректный хэштег';
};

const validateComment = (value) => {
  return value.length <= MAX_COMMENT_LENGTH;
};

const getCommentErrorMessage = (value) => {
  const excess = value.length - MAX_COMMENT_LENGTH;
  return `Комментарий слишком длинный на ${excess} символ${excess === 1 ? '' : 'ов'}`;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
}, true);

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  getHashtagErrorMessage,
  1,
  false
);

pristine.addValidator(
  commentInput,
  validateComment,
  getCommentErrorMessage,
  1,
  false
);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }
    evt.preventDefault();
    uploadForm.reset();
    closePhotoEditor();
  }
};

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};

const closePhotoEditor = () => {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetButton.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  pristine.reset();
}

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetButton.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      console.log('Форма валидна, можно отправлять');
    } else {
      console.log('Форма содержит ошибки');
    }
  });
};
