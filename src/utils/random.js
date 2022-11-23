/**
 * Функция получает два числа и возрвращает случайное число между ними
 * @constructor
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @returns {number} случайное число
 */


export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};