import { getRandomInteger, createIdGenerator } from "./utils";
const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
    'Артём', 'Анна', 'Иван', 'Мария', 'Сергей', 'Елена', 'Дмитрий', 'Ольга', 'Алексей', 'Наталья'
];
const PHOTO_DESCRIPTIONS = [
    'Кот спит на подоконнике',
    'Городские огни ночью',
    'Цветущая сакура весной',
    'Дети играют в парке',
    'Старинная улочка в Европе',
    'Снегопад в лесу',
    'Кофе и книга на рассвете',
    'Архитектура современного мегаполиса',
    'Поле под звёздным небом',
    'Пляж с пальмами',
    'Туманное утро в деревне',
    'Грибной дождь в тропиках',
    'Альпинист на вершине',
    'Старый автомобиль в гараже',
    'Фестиваль воздушных змеев',
    'Мост в тумане',
    'Фотография дождевых капель на стекле',
    'Песчаные дюны пустыни',
    'Морской прибой у скал',
    'Осенние листья на мостовой',
    'Новогодняя ёлка в центре города',
    'Луг с дикими цветами',
    'Луна над морем',
    'Закат над океаном',
    'Утренний пейзаж в горах',
];
const COUNT_PHOTOS = 25;
const generateComment = (commentIdGenerator) => {
    const id = commentIdGenerator();
    const avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    let message;
    if (getRandomInteger(1, 2) === 1) {
        message = MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
    } else {
        const firstIndex = getRandomInteger(0, MESSAGES.length - 1);
        let secondIndex = getRandomInteger(0, MESSAGES.length - 1);
        while (secondIndex === firstIndex) {
            secondIndex = getRandomInteger(0, MESSAGES.length - 1);
        }
        message = `${MESSAGES[firstIndex]} ${MESSAGES[secondIndex]}`;
    }
    const name = NAMES[getRandomInteger(0, NAMES.length - 1)];
    return {id, avatar, message, name};
}
export const generatePhotos = () => {
    const commentIdGenerator = createIdGenerator();
    return Array.from(
        { length: COUNT_PHOTOS },
        (_, index) => {
        const id = index + 1;
        const url = `photos/${index + 1}.jpg`;
        const description = PHOTO_DESCRIPTIONS[index];
        const likes = getRandomInteger(15, 200);
        const commentsCount = getRandomInteger(0, 30);
        const comments = Array.from(
            { length: commentsCount },
            () => generateComment(commentIdGenerator)
        );
        return { id, url, description, likes, comments };
        }
    );
}
