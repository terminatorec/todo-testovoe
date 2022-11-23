export const checkExtension = (file) => {
    if ((/\.(jpg|gif|png|svg|jpeg)/).test(file)) {
        return true
    }
    return false
};