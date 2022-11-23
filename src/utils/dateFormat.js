 /**
 * Функция получает время формата Date now() и возвращает строку в формате 10/10/2022 16:08
 * @constructor
 * @param {string} og - время в строчном формате
 * @returns {string} - возвращается строка в формате который нужен для отображения в UI
 */

export const dateFormat = (og) => {
    let date = new Date(og)
    let format =
        (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate()))
        + '/' +
        ((date.getMonth() + 1) > 9 ? (date.getMonth()+1) : ('0' + (date.getMonth()+1)))
        + '/' +
        date.getFullYear()
        + ' '  +
        date.getHours()
        + ':' +
        date.getMinutes()
    return format
} 