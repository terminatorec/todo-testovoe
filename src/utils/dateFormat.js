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