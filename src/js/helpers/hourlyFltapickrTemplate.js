
const fstime = {
    "inputAttributes": {
        "placeholder": "Entrer l'heure"
    },
    "flatpickr": {
        // "wrap": true,
        "showClearButton": false,
        "inlineHideInput": true,
        "defaultHour": 0,
        "defaultMinute": 0,
        "enableSeconds": false,
        "hourIncrement": 1,
        "minuteIncrement": 1,
        "time_24hr": true,
        "allowInput": false,
        "disableMobile": true
    }
}

let hourlyFltapickr = {
    "type": "object",
    "title": "horaire",
    "properties": {
        "from": {
            "type": "string",
            "format": "time",
            "title": "de",
            "options": fstime
        },
        "to": {
            "type": "string",
            "format": "time",
            "title": "à",
            "options": fstime
        }
    },
    "format": "grid"
}

let hourly = {
    "monday": {
        "type": "array",
        "title": "Lundi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyFltapickr
    },
    "tuesday": {
        "type": "array",
        "title": "Mardi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyFltapickr
    },
    "wednesday": {
        "type": "array",
        "title": "Mercredi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyFltapickr
    },
    "thursday": {
        "type": "array",
        "title": "Jeudi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyFltapickr
    },
    "friday": {
        "type": "array",
        "title": "Vendredi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyFltapickr
    },
    "saturday": {
        "type": "array",
        "title": "Samedi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyFltapickr
    },
    "sunday": {
        "type": "array",
        "title": "Dimanche",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyFltapickr
    }
}

export { hourly }