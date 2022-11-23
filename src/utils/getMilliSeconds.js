// функция нужна для сортировки массива по дедлайну задач
export const getMilliSeconds = (time) =>{
    let newtime = new Date(time).getTime()
    return newtime
}