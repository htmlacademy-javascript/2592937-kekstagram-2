import { debounce, getRandomInteger } from "./utils.js";
import { renderPictures } from "./gallery.js";

const FILTERS_COUNT = {
  RANDOM: 10,
};

const filtersContainer = document.querySelector('.img-filters');

let currentFilter = 'default';
let photos = [];

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getRandomPhotos = (items) => {
  const result = [];
  const indices = new Set();
  const maxCount = Math.min(FILTERS_COUNT.RANDOM, items.length);

  while (result.length < maxCount) {
    const index = getRandomInteger(0, items.length - 1);
    if (!indices.has(index)) {
      result.push(items[index]);
      indices.add(index);
    }
  }

  return result;
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
}

const debouncedUpdatePictures = debounce(updatePictures, 500);

const onFilterClick = ((evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
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
    setActiveFilter(evt.target);
    debouncedUpdatePictures();
  }
});

const init = (loadedPhotos) => {
  photos = loadedPhotos;
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
};

export { init };
