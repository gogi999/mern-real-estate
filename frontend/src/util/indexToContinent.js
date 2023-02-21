export const arrContinent = [
    'europe',
    'asia',
    'africa',
    'south america',
    'north america',
    'oceania'
];

export const continentToIndex = (continent) => {
    return arrContinent.findIndex((cont) => cont.toLowerCase() === continent.toLowerCase());
}

export const indexToContinent = (idx) => {
    return (arrContinent.filter((_, index) => index === Number(idx)))[0];
}
