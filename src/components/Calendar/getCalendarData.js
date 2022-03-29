
export const MONDAY = 'L', TUESDAY = 'M', WEDNESDAY = 'X', THURSDAY = 'J', FRIDAY = 'V', SATURDAY = 'S', SUNDAY = 'D';
export const weekDayName = ["sem",MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY];
export const monthName = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];
export const WEEK_A ='a', WEEK_B = 'b', FESTIVE = "FESTIVE", CONVOCATORY = "CONVOCATORY",
    SECOND_CONVOCATORY = "SECOND_CONVOCATORY", CONTINUE_CONVOCATORY = "CONTINUE_CONVOCATORY",
    NO_SCHOOL = "NO_SCHOOL", SCHOOL = "SCHOOL", CHANGE_DAY = "CHANGE_DAY", CULM_EXAM="CULM_EXAM";
export const JANUARY = "Ene";
export const ANOTHER_EXAM = "Otros";
export const examOptions = ["Pruebas eval continua", "Exámenes 1ª conv", "Exámenes 2ª conv", "Exámenes CULM", ANOTHER_EXAM];
const LUNES = "Lunes", MARTES = "Martes", MIERCOLES = "Miercoles", JUEVES = "Jueves", VIERNES = "Viernes"
export const changeDayOptions = [LUNES, MARTES, MIERCOLES, JUEVES, VIERNES];
const START_QUARTER = "INICIO_CUATRIMESTRE"
const WEEK_TOTAL = 7;
const weekDayIndex = new Map([[MONDAY, 0], [TUESDAY, 1], [WEDNESDAY, 2], [THURSDAY, 3], [FRIDAY, 4], [SATURDAY,5], [SUNDAY,6]]);
const weekDayNameConst = new Map([[MONDAY, LUNES], [TUESDAY, MARTES], [WEDNESDAY, MIERCOLES], [THURSDAY, JUEVES], [FRIDAY, VIERNES]]);
export const dayInSeconds = 60 * 60 * 24 * 1000
//Global variables
var weekNumber = 1;
var finalWeek = 1;
var finalDayOfQuarter = 1;
var firstDayOfQuarter = 1;
var totalWeekA = 0;
var totalWeekB = 0;


var schoolYears = {
    startYear: 0,
    endYear: 1
};
var legendList = new Map();
var countByWeekDay = [0, 0, 0, 0, 0];

export function getWeekConst(day) {
    return [...weekDayNameConst].find(([key, val]) => val == day)[0];
}

export function getWeekdayName(day) {
    return weekDayNameConst.get(day)
}

function sortByDate(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}
function lastday(y, m, c) {
    return new Date(y, m + c, 0);
}

function getLastDayMonth(day) {
    let date = new Date(day);
    let year = date.getFullYear(), month = date.getMonth()
    let newDate = lastday(year, month, 1)
    if (date.getDate() > 20)
        newDate = lastday(year, month, 2)
    return newDate;
}

function getDifferenceInDays(start, end) {
    let diffInSeg = ((new Date(end)).getTime() - (new Date(start)).getTime());
    return diffInSeg / (1000 * 3600 * 24);
}

const addLegend = (day) => {
    let arrayComment = day.comment;
    if (arrayComment?.length > 0) {
        arrayComment.forEach(comment => {
            let d = new Date(day.date);
            let formatDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear().toString().substr(-2);

            if (legendList.get(comment) == null) {
                legendList.set(comment, [day.type, formatDate]);
            } else {
                let lastDate = legendList.get(comment);
                lastDate[2] = formatDate;
                legendList.set(comment, lastDate);
            }
        })
        
    }
}

const isFestiveWeek = (weekArray) => {
    let noFestiveDay = weekArray.filter(day => day.type == SCHOOL || day.type == CHANGE_DAY);
    return noFestiveDay.length < 3;   
}

const getDayInfo = (weekArray) => {
    let dayInfo = [];

    for (let i = 0; i < weekArray.length; i++) {
        let weekDay = weekArray[i].day;
        let dayType = weekArray[i].type;
        if (dayType==SCHOOL || dayType==CHANGE_DAY )countByWeekDay[weekDayIndex.get(weekDay)]++;
        addLegend(weekArray[i])
        const weekLetter = weekArray[i].week;
        var type = getWeekLetterAndNumber(weekLetter);
        dayInfo.push(
            {
                date: weekArray[i].date,
                day: weekDay,
                week: type,
                type: dayType
            }
        );
        console.log("WEEKLETTER " + JSON.stringify(weekArray[i]) + " ---  " + type)

    }
    return dayInfo;
};

const getWeekLetterAndNumber = (weekLetter) => {
    var num = weekLetter === undefined ? "" : "" + weekLetter;

    if (weekLetter === WEEK_A) {
        num += Math.round(totalWeekA/WEEK_TOTAL);
        totalWeekA++;
    }
    else if (weekLetter === WEEK_B) {
        num += Math.round(totalWeekB/WEEK_TOTAL);
        totalWeekB++;
    }
    console.log("WEEKNUMBER---", weekLetter, num, weekLetter === WEEK_B)

    return num;    
}
const getWeeks = (monthArray) => {
    let weeks = [];
    for (let i = 0; i < (monthArray.length / WEEK_TOTAL); i++) {
        let dayInfo = getDayInfo(monthArray.slice(i * WEEK_TOTAL, (i + 1) * WEEK_TOTAL));
        let thisWeekNumber = null;
        let isFinalWeek = weekNumber == finalWeek;
        if (!isFestiveWeek(dayInfo)) {
            thisWeekNumber = weekNumber;
            weekNumber++;
        } else {
            finalWeek--;
            isFinalWeek = weekNumber - 1 == finalWeek;
        }
        weeks.push(
            {
                weekNumber: thisWeekNumber,
                dayInfo: dayInfo,
                finalWeek: isFinalWeek,
            }
        );
    }
    return weeks;
}

export function getWeekDayByIndex(index) {
    return [...weekDayIndex].find(([key, val]) => val == index)[0];
}

const alignFirstWeek = (array) => {
    console.log("ARRAY---" + JSON.stringify(array))

    let firstDay = array[0];
    var calendarArray = [...array]
    console.log("START--"+ JSON.stringify(firstDay))
    if (firstDay.day != MONDAY) {
        let date = new Date(firstDay.date)
        for (let i = weekDayIndex.get(firstDay.day)-1; 0 <= i ; i--) {
            date.setDate(date.getDate() - 1);
            let newDate = {
                date: new Date(date),
                day: getWeekDayByIndex(i),
                type: NO_SCHOOL,
                comment: null,
                week: ""
            }
            console.log("START---!"+JSON.stringify(newDate))
            calendarArray.push(newDate)
        }
    }
    console.log("START--" + JSON.stringify(calendarArray))

    return calendarArray;
}

const alignEndWeek = (array) => {
    console.log("ARRAY---" + JSON.stringify(array))

    let lastDay = array[array.length-1];
    var calendarArray = [...array];
    if (lastDay.day != SUNDAY) {
        let date = new Date(lastDay.date);
        for (let i = weekDayIndex.get(lastDay.day); i<weekDayIndex.get(SUNDAY); i++) {
            date.setDate(date.getDate() + 1);
            calendarArray.push({
                date: new Date(date),
                day: getWeekDayByIndex(i),
                type: NO_SCHOOL,
                comment: null,
                week: ""
            });
        }
    }
    return calendarArray;
}

export const getQuarterArray = (array, number) => {
    if (array != null && array.length == 0) return [];
    let calendarArray = array.sort(sortByDate);
    let secondIndex = calendarArray.slice(1, calendarArray.length - 1).findIndex(d => d.comment == START_QUARTER) + 1;
    let thirdIndex = calendarArray.slice(secondIndex + 2, calendarArray.length - 1).findIndex(d => d.comment == START_QUARTER) + secondIndex + 2;
    let quarterArray;
    if (number == 1) 
        quarterArray = calendarArray.slice(0, secondIndex)
    else if (number == 2)
        quarterArray = calendarArray.slice(secondIndex, thirdIndex)
    else 
        quarterArray = calendarArray.slice(thirdIndex, calendarArray.length)
    return quarterArray
}

export const getConvertedData = (array) => {
    if (array == null || array.length == 0) return []
    setSchoolYears(array[0].date);
    legendList = new Map();
    countByWeekDay = [0, 0, 0, 0, 0]
    finalDayOfQuarter = new Date(array[array.length - 1].date)

    let firstWeekCalendar = alignFirstWeek(array)
    firstWeekCalendar.sort(sortByDate);
    firstDayOfQuarter = new Date(firstWeekCalendar[0].date);
    let calendarArray = alignEndWeek(firstWeekCalendar)
    calendarArray.sort(sortByDate);
    console.log("START--" + JSON.stringify(calendarArray))

    weekNumber = 1;
    totalWeekA = 7;
    totalWeekB = 7;
    finalWeek = Math.ceil(getDifferenceInDays(calendarArray[0].date, calendarArray[calendarArray.length - 1].date) / WEEK_TOTAL);
    let numberMonths = Math.ceil(finalWeek / 4);
    let firstDayIndex = 0, firstDayMonth, lastDayMonth, lastDayIndex;
    let calendarData = [];
    for (let i = 0; i < numberMonths; i++) {
        if (firstDayIndex >= calendarArray.length) break;
        firstDayMonth = calendarArray[firstDayIndex].date;
        lastDayMonth = getLastDayMonth(firstDayMonth);

        lastDayIndex = firstDayIndex + Math.ceil(getDifferenceInDays(firstDayMonth, lastDayMonth) / WEEK_TOTAL) * WEEK_TOTAL;
        let monthArray = calendarArray.slice(firstDayIndex, lastDayIndex);
        let secondWeek = new Date(new Date(firstDayMonth).getTime() + 7 * dayInSeconds)
        let monthInfo = lastday(secondWeek.getFullYear(), secondWeek.getMonth(), 1)

        calendarData.push(
            {
                month: monthName[monthInfo.getMonth()],
                weeks: getWeeks(monthArray)
            }
        );
        firstDayIndex = lastDayIndex;
    }
    console.log("FINAL-- "+ JSON.stringify(calendarArray))
    return calendarData;
};

const setSchoolYears = (date) => {
    let startYear = new Date(date).getFullYear();
    schoolYears = {
        startYear: startYear,
        endYear: startYear + 1
    };
}

export const getStartYear = (date) => {
    return schoolYears.startYear;
}

export const getLegends = () => {
    var legends = [];
    for (const [key, value] of legendList) {
        legends.push(
            {
                type: !value[0] ? null:value[0],
                startDate: !value[1] ? null : value[1],
                endDate: !value[2] ? null : value[2],
                comment: key
            }
        )
    }
    return legends;
}

export const getRealWeekNumber = (week) => {
    let number = parseInt(week.substr(1)) * 2;
    if (week.charAt(0) == 'a') {
        number--;
    }
    console.log("WEEKNUMBER--", week, number)

    return number;
}

//---Style functions
export const getTypeColor = (type) => {
    var color = "";
    switch (type) {
        case CHANGE_DAY:
            color = "yellow";
            break;
        case FESTIVE:
            color = "#C7E093";
            break;
        case CONVOCATORY:
            color = "#FF99CC";
            break;
        case CONTINUE_CONVOCATORY:
            color = "#FF33CC";
            break;
        case SECOND_CONVOCATORY:
            color = "#CC00CC";
            break;
        case CULM_EXAM:
            color = "#9966ff";
            break;
        case SCHOOL:
            color = 'transparent';
            break;
    }
    return color;
}

export const getBorderStyle = (date, day,type) => {
    var style = "";
    var thisDate = new Date(date)
    let finalDay = lastday(thisDate.getFullYear(), thisDate.getMonth(),1).getDate()
    var finalWeek = ((finalDayOfQuarter.getTime() - 7 * dayInSeconds) < thisDate.getTime())
    var firstWeek = ((firstDayOfQuarter.getTime() + 7 * dayInSeconds) > thisDate.getTime()) && (firstDayOfQuarter.getTime()<=thisDate.getTime())
    if (finalDay != 0) {
        if (thisDate.getDate() == finalDay || finalDayOfQuarter.getTime() == thisDate.getTime())
            style = "rightBottomBorder";
        else if ((thisDate.getDate() + 6) % finalDay < 7) {
            if (day == SUNDAY)
                style = "rightBottomBorder";
            else
                style = "bottomBorder";
        } else if (day == SUNDAY && finalWeek) {
            style = "rightBottomBorder";
        } else if (day == SUNDAY) {
            style = "rightBorder";
        } else if (finalWeek && type!=NO_SCHOOL) {
            style = "bottomBorder";
        }
        if (firstWeek) style += " topBorder"

        console.log("Final---style-- " + thisDate + "   " + firstWeek + "   " + firstDayOfQuarter + "  "+style)

    }
    return style;
};

export const getMonthHeader = (index, length, month) => {
    let header = null;
    if (month != JANUARY && index == 0)
        header = (<td class="header monthHeader" rowSpan={length}>{month}</td>);
    else if (month == JANUARY && index == 1)
        header = (<td class="headerWithoutTop monthHeader" rowSpan={length - 1}>{month}</td>);
    else if (month == JANUARY && index == 0 )
        header = (<td class="headerWithoutBottom monthHeader" rowSpan={1}>{schoolYears.endYear}</td>);
    return header;
}

export const getWeekHeader = (enable) => {
    if (enable)
        return weekDayName.map((day, i) => {
            if (i == 0)
                return (<th key={i} class="header orangeLetter">
                    {day}
                </th>);
            else 
                return (<th key={i}>
                    <preHeader>{day}<div class="whiteLetter">{countByWeekDay[i - 1]}</div></preHeader>
                </th>);
        });
    else
        return null;
}

export const getWeekNumberStyle = (index, finalWeek) => {
    let header = "rightBorder";
    if (finalWeek) {
        header = "rightBottomBorder";
    } else if (index == 0) {
        header = "rightTopBorder"
    }
    return header + " weekNumber";
}

export default getConvertedData;