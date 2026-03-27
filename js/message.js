import { isEscapeKey } from './utils.js';

const showMessage = (templateSelector) => {
  const template = document.querySelector(templateSelector);
  if (!template) {
    return;
  }
  const messageElement = template.content.cloneNode(true);
  document.body.appendChild(messageElement);
  const message = document.querySelector(templateSelector.replace('#', '.'));
  if (!message) {
    return;
  }

  const api = { remove: null };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      api.remove?.();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === message) {
      api.remove?.();
    }
  };

  api.remove = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  const button = message.querySelector('.success__button, .error__button');
  if (button) {
    button.addEventListener('click', api.remove);
  }
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => showMessage('#success');
const showErrorMessage = () => showMessage('#error');

const showDataError = () => {
  if (document.querySelector('.data-error')) {
    return;
  }

  const dataError = document.createElement('div');
  dataError.classList.add('data-error');
  dataError.textContent = 'Не удалось загрузить данные. Попробуйте обновить страницу';
  document.body.appendChild(dataError);
}

export { showSuccessMessage, showErrorMessage, showDataError };
