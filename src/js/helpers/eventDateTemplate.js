let eventDate = {
    "date": {
        "type": "string",
        "format": "date",
        "title": "Date",
        // "description": "Standard date field with flatpickr",
        "options": {
            "inputAttributes": {
                "placeholder": "Entrer la date"
            },
            "flatpickr": {
                "inlineHideInput": true,
                "showClearButton": false,
                "weekNumbers": true,
                // "wrap": true,
                "allowInput": false,
                "altInput": true,
                "altInputClass": "disableThisAltInputFirst",
                "altFormat": "d/m/Y",
                "dateFormat": "Y-m-d",
                "locale": {
                    "firstDayOfWeek": 1 // start week on Monday
                },
                // "disable": [
                //     (date) => { return true }
                // ],
                "disableMobile": true
            },
            "dependencies": {
                "allDay": true,
                "isRange": false
            }
        }
    },
    "dateRange": {
        "type": "string",
        "format": "date",
        "title": "Intervalle de dates",
        // "description": "Standard date field with flatpickr",
        "options": {
            "inputAttributes": {
                "placeholder": "Entrer l'intervalle"
            },
            "flatpickr": {
                "inlineHideInput": true,
                "showClearButton": false,
                "weekNumbers": true,
                // "wrap": true,
                "allowInput": false,
                "altInput": true,
                "altInputClass": "disableThisAltInputFirst",
                "altFormat": "d/m/Y",
                "dateFormat": "Y-m-d",
                "locale": {
                    "firstDayOfWeek": 1 // start week on Monday
                },
                // "disable": [
                //     (date) => { return true }
                // ],
                "mode": "range",
                "disableMobile": true
            },
            "dependencies": {
                "allDay": true,
                "isRange": true
            }
        }
    },
    "dateTime": {
        "type": "string",
        "format": "datetime-local",
        "title": "Date temps",
        // "description": "Standard date field with flatpickr",
        "options": {
            "inputAttributes": {
                "placeholder": "Entrer la date"
            },
            "flatpickr": {
                "inlineHideInput": true,
                "showClearButton": false,
                "weekNumbers": true,
                // "wrap": true,
                "allowInput": false,
                "altInput": true,
                "altInputClass": "disableThisAltInputFirst",
                "altFormat": "d/m/Y H:i",
                "dateFormat": "Y-m-d H:i",
                "enableTime": true,
                "time_24hr": true,
                "locale": {
                    "firstDayOfWeek": 1 // start week on Monday
                },
                // "disable": [
                //     (date) => { return true }
                // ],
                "disableMobile": true
            },
            "dependencies": {
                "allDay": false,
                "isRange": false
            }
        }
    },
    "dateTimeRange": {
        "type": "string",
        "format": "datetime-local",
        "title": "Intervalle de dates temps",
        // "description": "Standard date field with flatpickr",
        "options": {
            "inputAttributes": {
                "placeholder": "Entrer l'intervalle"
            },
            "flatpickr": {
                "inlineHideInput": true,
                "showClearButton": false,
                "weekNumbers": true,
                // "wrap": true,
                "allowInput": false,
                "altInput": true,
                "altInputClass": "disableThisAltInputFirst",
                "altFormat": "d/m/Y H:i",
                "dateFormat": "Y-m-d H:i",
                "enableTime": true,
                "time_24hr": true,
                "locale": {
                    "firstDayOfWeek": 1 // start week on Monday
                },
                // "disable": [
                //     (date) => { return true }
                // ],
                "mode": "range",
                "disableMobile": true
            },
            "dependencies": {
                "allDay": false,
                "isRange": true
            }
        }
    }
}

export { eventDate }