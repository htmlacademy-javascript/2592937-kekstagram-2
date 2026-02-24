import { isEscapeKey } from './utils';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetButton = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const EFFECTS = {
  none: { filter: '', min: 0, max: 1, step: 0.1, unit: '', start: 1 },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', start: 1 },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '', start: 1 },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%', start: 100 },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px', start: 0 },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '', start: 1 }
};

const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleValueField = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

let currentEffect = 'none';
let slider = null;

const applyIntensity = (value) => {
  effectLevelValue.value = value;
  const { filter, unit } = EFFECTS[currentEffect];
  previewImage.style.filter = filter ? `${filter}(${value}${unit})` : '';
};

const createSlider = () => {
  if (slider) {
    slider.destroy();
    slider = null;
  }

  effectLevelContainer.innerHTML = '';

  noUiSlider.create(effectLevelContainer, {
    start: EFFECTS[currentEffect].start,
    range: {
      'min': EFFECTS[currentEffect].min,
      'max': EFFECTS[currentEffect].max
    },
    step: EFFECTS[currentEffect].step,
    format: {
      to: (value) => Number(value).toFixed(2),
      from: Number
    }
  });

  slider = effectLevelContainer.noUiSlider;

  applyIntensity(EFFECTS[currentEffect].start);

  slider.on('update', (values) => {
    applyIntensity(parseFloat(values[0]));
  });
};

const applyEffect = (effectName) => {
  currentEffect = effectName;

  previewImage.className = '';
  if (effectName !== 'none') {
    previewImage.classList.add(`effects__preview--${effectName}`);
  }

  if (effectName === 'none') {
    effectLevelContainer.classList.add('hidden');
    previewImage.style.filter = '';
    effectLevelValue.value = '';
    if (slider) {
      slider.destroy();
      slider = null;
    }
  } else {
    effectLevelContainer.classList.remove('hidden');
    createSlider();
  }
};

const scaleManager = (() => {
  let currentScale = SCALE_DEFAULT;
  const updateScale = (newScale) => {
    currentScale = newScale;
    scaleValueField.value = `${currentScale}%`;
    previewImage.style.transform = `scale(${currentScale / 100})`;
  };

  const decrease = () => {
    if (currentScale > SCALE_MIN) {
      updateScale(currentScale - SCALE_STEP);
    }
  };

  const increase = () => {
    if (currentScale < SCALE_MAX) {
      updateScale(currentScale + SCALE_STEP);
    }
  };

  const reset = () => {
    updateScale(SCALE_DEFAULT);
  };
  return { decrease, increase, reset };
})();

const getHashtags = (value) => {
  if (!value.trim()) {
    return [];
  }
  return value.trim().split(/\s+/);
};

const getHashtagValidationError = (value) => {
  const hashtags = getHashtags(value);

  if (!hashtags.length) {
    return '';
  }

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
        return 'Хэштег не может состоять только из решётки';
      }
      if (!/^#/.test(tag)) {
        return 'Хэштег должен начинаться с символа #';
      }
      return 'Хэштег может содержать только буквы и цифры';
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      return `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов (включая #)`;
    }
  }
  return '';
};

const validateHashtags = (value) => !getHashtagValidationError(value);
const getHashtagErrorMessage = (value) => getHashtagValidationError(value);

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

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

const closePhotoEditor = () => {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetButton.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadForm.reset();
  uploadFileControl.value = '';
  pristine.reset();
  scaleManager.reset();
  applyEffect('none');
  if (slider) {
    slider.destroy();
    slider = null;
  }
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

const onUploadFileControlChange = () => {
  photoEditorForm.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  scaleManager.reset();
  applyEffect('none');
  photoEditorResetButton.addEventListener('click', onPhotoEditorResetBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Форма валидна, можно отправлять');
  } else {
    console.log('Форма содержит ошибки');
  }
};

export const initUploadModal = () => {
  pristine.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage, 1, false);
  pristine.addValidator(commentInput, validateComment, getCommentErrorMessage, 1, false);

  document.querySelectorAll('.effects__radio').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      applyEffect(e.target.value);
    });
  });

  scaleSmallerBtn.addEventListener('click', scaleManager.decrease);
  scaleBiggerBtn.addEventListener('click', scaleManager.increase);

  uploadFileControl.addEventListener('change', onUploadFileControlChange);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};
