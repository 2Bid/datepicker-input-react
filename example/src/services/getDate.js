function getFirstDayMonth(year, month){
    return new Date(year, month - 1, 1);
}

function getLastDayMonth(year, month){
    // retourne par ex : Sat Dec 31 2022 00:00:00 GMT+0100 (heure normale d’Europe centrale)
    return new Date(year, month, 0);
}

function getCurrentDay(){
    // retourne un nombre entre 1-31 qui correspond au jour actuel
    return new Date().getDate()
}

const getNumberDaysMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
}

const getArrayDaysMonth = (year, month) => {
    let allDays = []
    const totalDays = new Date(year, month, 0).getDate();
    for (let i = 1; i < totalDays + 1; i++) {
        allDays.push(i)
    }
    return allDays
}

const getAllMonth = () => {
    const allMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return allMonth
}

const getCurrentIndexMonth = () => {
    const date = new Date()
    const currentIndexMonth = date.getMonth()
    return currentIndexMonth
}

const getCurrentYear = () => {
    return new Date().getFullYear()
}

export {getFirstDayMonth, getLastDayMonth, getCurrentDay, getNumberDaysMonth,getArrayDaysMonth, getAllMonth, getCurrentIndexMonth, getCurrentYear}