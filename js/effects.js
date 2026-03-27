const EFFECTS = {
  none: { filter: '', min: 0, max: 1, step: 0.1, unit: '', start: 1 },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', start: 1 },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '', start: 1 },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%', start: 100 },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px', start: 3 },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '', start: 3 }
};

const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

let currentEffect = 'none';
let slider = null;

const applyIntensity = (value) => {
  effectLevelValue.value = value;
  const { filter, unit } = EFFECTS[currentEffect];
  previewImage.style.filter = filter ? `${filter}(${value}${unit})` : '';
};

const createSlider = () => {
  if (!effectLevelSlider || typeof noUiSlider === 'undefined') {
    return;
  }

  if (slider) {
    slider.destroy();
    slider = null;
  }

  effectLevelSlider.innerHTML = '';

  noUiSlider.create(effectLevelSlider, {
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
  slider = effectLevelSlider.noUiSlider;
  applyIntensity(EFFECTS[currentEffect].start);

  slider.on('update', (values) => {
    applyIntensity(parseFloat(values[0]));
  });
};

const applyEffect = (effectName) => {
  currentEffect = effectName;
  if (effectName === 'none') {
    previewImage.className = '';
    effectLevelContainer.classList.add('hidden');
    previewImage.style.filter = '';
    effectLevelValue.value = '';

    if (slider) {
      slider.destroy();
      slider = null;
    }
  } else {
    previewImage.className = `effects__preview--${effectName}`;
    effectLevelContainer.classList.remove('hidden');
    createSlider();
  }
};

const reset = () => {
  applyEffect('none');
};

const init = () => {
  effectsList.addEventListener('change', (evt) => {
    if (evt.target.matches('.effects__radio')) {
      applyEffect(evt.target.value);
    }
  });
};

export { init, reset, applyEffect };
