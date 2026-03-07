const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleValueField = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

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

const init = () => {
  scaleSmallerBtn.addEventListener('click', decrease);
  scaleBiggerBtn.addEventListener('click', increase);
};

export { init, reset };
