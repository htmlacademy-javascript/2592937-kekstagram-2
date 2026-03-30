import { isEscapeKey } from './utils.js';

const TEMPLATES = {
  success: document.querySelector('#success'),
  error: document.querySelector('#error')
};

let currentRemoveHandler = null;

const showMessage = (type) => {
  const template = TEMPLATES[type];
  if (!template) {
    return;
  }

  if (currentRemoveHandler) {
    currentRemoveHandler();
  }

  const messageElement = template.content.cloneNode(true);
  const message = messageElement.firstElementChild;

  if (!message) {
    return;
  }

  document.body.append(messageElement);

  function removeMessage() {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOutsideClick);
    currentRemoveHandler = null;
  }

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (evt.target === message) {
      removeMessage();
    }
  }

  const button = message.querySelector('.success__button, .error__button');
  if (button) {
    button.addEventListener('click', removeMessage);
  }
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);

  currentRemoveHandler = removeMessage;
};

const showSuccessMessage = () => showMessage('success');
const showErrorMessage = () => showMessage('error');

const showDataError = () => {
  if (document.querySelector('.data-error')) {
    return;
  }

  const dataError = document.createElement('div');
  dataError.classList.add('data-error');
  dataError.textContent = 'Не удалось загрузить данные. Попробуйте обновить страницу';
  document.body.appendChild(dataError);

  setTimeout(() => {
    dataError.remove();
  }, 5000);
};

export { showSuccessMessage, showErrorMessage, showDataError };
