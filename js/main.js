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
const photoDescriptions = [
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
const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const createIdGenerator = () => {
    let lastId = 0;
    return () => ++lastId;
};
const generateComment = (commentIdGenerator) => {
    const id = commentIdGenerator();
    const avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    const messageCount = getRandomInteger(1,2);
    const messageParts = [];
    for (let i = 0; i < messageCount; i++) {
        messageParts.push(MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]);
    }
    const message = messageParts.join(' ');
    const name = NAMES[getRandomInteger(0, NAMES.length - 1)];
    return {id, avatar, message, name};
}
const generatePhotos = () => {
    const photos = [];
    const commentIdGenerator = createIdGenerator();
    for (let i = 1; i <= 25; i++) {
        const id = i;
        const url = `photos/${i}.jpg`;
        const description = photoDescriptions[i - 1];
        const likes = getRandomInteger(15, 200);
        const commentsCount = getRandomInteger(0, 30);
        const comments = [];
        for (let j = 0; j < commentsCount; j++) {
            comments.push(generateComment(commentIdGenerator));
        }
        photos.push({ id, url, description, likes, comments });
    }
    return photos;
}
const photos = generatePhotos();