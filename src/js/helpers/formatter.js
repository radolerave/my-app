export default class Formatter {
    constructor() {

    }

    dateFormatter(theDate, preformatted = false) {
        const dateObj = (theDate.constructor.toString().indexOf("Date") > -1) ? 
            theDate
            :
            new Date(theDate)
        
        let day = String(dateObj.getDate()).padStart(2, '0'), 
        month = String(dateObj.getMonth() + 1).padStart(2, '0'), 
        year = dateObj.getFullYear(), 
        hours = String(dateObj.getHours()).padStart(2, '0'), 
        minutes = String(dateObj.getMinutes()).padStart(2, '0'), 
        seconds = String(dateObj.getSeconds()).padStart(2, '0'), 
        milliseconds = String(dateObj.getMilliseconds()).padStart(3, '0')
        
        if(preformatted) {
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
        }
        else {
            return {
                day: day,
                month: month,
                year: year,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                milliseconds: milliseconds
            }
        }
    }

    htmlStripTag(html, replaceBy = "") {
        return html.replace(/<[^>]*>/g, replaceBy)
    }
}