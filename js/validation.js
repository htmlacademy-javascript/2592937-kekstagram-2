const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

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

    if (tag === '#') {
      return 'Хэштег не может состоять только из решётки';
    }

    if (!tag.startsWith('#')) {
      return 'Хэштег должен начинаться с символа #';
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      return `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов (включая #)`;
    }

    if (!HASHTAG_PATTERN.test(tag)) {
      return 'Хэштег может содержать только буквы и цифры';
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

export { validateHashtags, getHashtagErrorMessage, validateComment, getCommentErrorMessage };
