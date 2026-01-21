import { getRandomInteger } from './utils.js';
import { MESSAGES, NAMES, PHOTO_DESCRIPTIONS, COUNT_PHOTOS } from './data.js';
const createIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};
const generateComment = (commentIdGenerator) => {
  const avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
  const messageCount = getRandomInteger(1, 2);
  const messageSet = new Set();
  while (messageSet.size < messageCount) {
    messageSet.add(MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]);
  }
  const message = Array.from(messageSet).join(' ');
  const name = NAMES[getRandomInteger(0, NAMES.length - 1)];
  const id = commentIdGenerator();
  return {id, avatar, message, name};
};
const createPhotoObject = (index, commentIdGenerator) => {
  const id = index + 1;
  const url = `photos/${index + 1}.jpg`;
  const description = PHOTO_DESCRIPTIONS[index];
  const likes = getRandomInteger(15, 200);
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from(
    {length: commentsCount},
    () => generateComment(commentIdGenerator)
  );
  return {id, url, description, likes, comments};
};
export const generatePhotos = () => {
  const commentIdGenerator = createIdGenerator();
  return Array.from(
    { length: COUNT_PHOTOS },
    (_, index) => createPhotoObject(index, commentIdGenerator)
  );
};
