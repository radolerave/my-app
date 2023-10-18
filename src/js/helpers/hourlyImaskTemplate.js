
const imaska = {
    mask: 'hh:mm',
    lazy: false,  // make placeholder always visible
    blocks: {
        'hh': {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23,            
            placeholderChar: '0',
        },
        'mm': {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,            
            placeholderChar: '0',
        }
    }
}

let hourlyImask = {
    "type": "object",
    "title": "horaire",
    "properties": {
        "from": {
            "type": "string",
            "title": "de",
            "options": {
                "imask": imaska
            }
        },
        "to": {
            "type": "string",
            "title": "à",
            "options": {
                "imask": imaska
            }
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
        "items": hourlyImask
    },
    "tuesday": {
        "type": "array",
        "title": "Mardi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyImask
    },
    "wednesday": {
        "type": "array",
        "title": "Mercredi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyImask
    },
    "thursday": {
        "type": "array",
        "title": "Jeudi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyImask
    },
    "friday": {
        "type": "array",
        "title": "Vendredi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyImask
    },
    "saturday": {
        "type": "array",
        "title": "Samedi",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyImask
    },
    "sunday": {
        "type": "array",
        "title": "Dimanche",
        "format": "tabs-top",
        "maxItems": 4,
        "items": hourlyImask
    }
}

export { hourly }