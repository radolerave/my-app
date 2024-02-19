import Countries from "./countries-complete-list.js"

let enums = {
    countriesList: {},
    
}

/*COUNTRIES*/
const countries = new Countries()
const countriesCompteteList = countries.countriesList

let countriesList = { 
    "keys": [""],
    "values": ["Je ne sais pas"],
    "obj": { "": "Je ne sais pas" },    
}

const defaultChoices = ["MG", "FR", "ES", "US", "CN", "GB", "DE", "JP"]

// Fonction pour récupérer le nom du pays en fournissant le code
function getCountryNameByCode(completeList, code) {
    // Parcourir le tableau d'objets
    for (var i = 0; i < completeList.length; i++) {
        // Vérifier si le code du pays correspond
        if (completeList[i].code === code) {
            // Retourner le nom du pays
            return completeList[i].name;
        }
    }
    // Retourner null si aucun pays correspondant n'est trouvé
    return null;
}

for(let i=0; i<defaultChoices.length; i++) {
    let resp = getCountryNameByCode(countriesCompteteList, defaultChoices[i])
    
    if(resp != null) {
        countriesList.keys.push(defaultChoices[i])
        countriesList.values.push(resp)
        countriesList["obj"][defaultChoices[i]] = resp
    }    
}

enums.countriesList = countriesList
/*COUNTRIES*/

/*WHO_WHAT*/
const whoWhat = {
    "keys": [0,1,2],
    "values": ['Je ne sais pas', 'Une société', 'Un individu'],
}

enums.whoWhat = whoWhat
/*WHO_WHAT*/

/*SECTORS*/
const sectors = {
    "keys": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    "values": [
        "Je ne sais pas",
        "Agriculture, Pêche et Élevage",
        "Alimentation et Restauration",
        "Art et Culture",
        "Automobile",
        "BTP (Bâtiment et Travaux Publics)",
        "Agroalimentaire",
        "Commerce",
        "Divertissement et Médias",
        "Éducation",
        "Énergie et Environnement",
        "Finance et Assurances",
        "Immobilier",
        "Industrie manufacturière",
        "Ingénierie",
        "Mode et Esthétique",
        "Publicité et Marketing",
        "Santé et Pharmaceutique",
        "Services Financiers et Bancaires",
        "Services Professionnels",
        "Technologie, Informatique et Télécommunications",
        "Tourisme et Hôtellerie",
        "Transport et Logistique"
    ]
}

enums.sectors = sectors
/*SECTORS*/

/*PHONES*/
const phoneType = {
    "keys": [0,1,2,3,4],
    "values": ['Autre', 'Mobile', 'Fixe', 'WhatsApp', 'Skype'],
    "icons": ["call-outline", "phone-portrait-outline", "call-outline", "logo-whatsapp", "logo-skype"],
}

enums.phoneType = phoneType
/*PHONES*/

/*LINKS*/
const linkType = {
    "keys": [0,1,2,3,4,5],
    "values": ['Autre', 'Site WEB', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter'],
    "icons": ["link-outline", "globe-outline", "logo-facebook", "logo-instagram", "logo-linkedin", "logo-twitter"],
}

enums.linkType = linkType
/*LINKS*/

export { enums }