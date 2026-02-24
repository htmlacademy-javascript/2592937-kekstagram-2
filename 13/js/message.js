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

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === message) {
      removeMessage();
    }
  };

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  const button = message.querySelector('.success__button, .error__button');
  if (button) {
    button.addEventListener('click', removeMessage);
  }
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => showMessage('#success');
const showErrorMessage = () => showMessage('#error');

export { showSuccessMessage, showErrorMessage };
