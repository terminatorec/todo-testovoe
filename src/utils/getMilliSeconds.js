/**
 * Функция получает время формата Date now() и возвращает количество секунд в формате Date now().getTime()
 * @constructor
 * @param {string} time - время в строчном формате
 * @returns {number} - возвращается число секунд
 */

export const getMilliSeconds = (time) => {
    let newtime = new Date(time).getTime()
    return newtime
}