import { debounce, getRandomInteger } from './utils.js';
import { renderPictures } from './gallery.js';

const FILTERS_COUNT = {
  RANDOM: 10,
};

const DEBOUNCE_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');

let currentFilter = 'default';
let photos = [];

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getRandomPhotos = (items) => {
  const results = [];
  const indices = new Set();
  const maxCount = Math.min(FILTERS_COUNT.RANDOM, items.length);

  while (results.length < maxCount) {
    const index = getRandomInteger(0, items.length - 1);
    if (!indices.has(index)) {
      results.push(items[index]);
      indices.add(index);
    }
  }

  return results;
};

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case 'random':
      return getRandomPhotos(photos);
    case 'discussed':
      return [...photos].sort(sortByComments);
    default:
      return photos;
  }
};

const setActiveFilter = (activeButton) => {
  document.querySelectorAll('.img-filters__button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const updatePictures = () => {
  renderPictures(getFilteredPhotos());
};

const debouncedUpdatePictures = debounce(updatePictures, DEBOUNCE_DELAY);

const onFilterClick = ((evt) => {
  const button = evt.target.closest('.img-filters__button');
  if (!button) {
    return;
  }

  const filterMap = {
    'filter-default': 'default',
    'filter-random': 'random',
    'filter-discussed': 'discussed',
  };

  const newFilter = filterMap[evt.target.id];
  if (newFilter && newFilter !== currentFilter) {
    currentFilter = newFilter;
    setActiveFilter(button);
    debouncedUpdatePictures();
  }
});

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
};

export { initFilters };
