import { DateTime } from 'luxon';

export default class Formatter {
    constructor() {

    }

    dateFormatter(theDate, params = { locale: "fr-FR", preset: "DATETIME_SHORT_WITH_SECONDS" }) {
        let effectiveParams = {}

        try{
            effectiveParams.locale = params.locale
            effectiveParams.preset = params.preset
        }
        catch(err) {
            effectiveParams = { locale: "fr-FR", preset: "DATETIME_SHORT_WITH_SECONDS" }
        }

        const dateObj = (theDate.constructor.toString().indexOf("Date") > -1) ? 
            theDate
            :
            new Date(theDate)
        
        let year = dateObj.getFullYear(), 
        month = dateObj.getMonth() + 1,
        day = dateObj.getDate(), 
        hours = dateObj.getHours(), 
        minutes = dateObj.getMinutes(), 
        seconds = dateObj.getSeconds(), 
        milliseconds = dateObj.getMilliseconds()

        const dt = DateTime.local(year, month, day, hours, minutes, seconds, milliseconds);

        // console.log(locale)
        
        return dt.setLocale(effectiveParams.locale).toLocaleString(DateTime[effectiveParams.preset])
    }

    htmlStripTag(html, replaceBy = "") {
        return html.replace(/<[^>]*>/g, replaceBy)
    }
}