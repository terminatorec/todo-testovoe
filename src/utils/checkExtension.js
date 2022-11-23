
 /**
 * Функция получает ссылку на файл и возвращает значение true если ссылка является изображением
 * @constructor
 * @param {string} file - ссылка на файл
 * @returns {bool} - возвращается логическое да если ссылка - это картинка
 */
export const checkExtension = (file) => {
    if ((/\.(jpg|gif|png|svg|jpeg)/).test(file)) {
        return true
    }
    return false
};