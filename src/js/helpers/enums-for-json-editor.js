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
    "obj": { 0: 'Je ne sais pas', 1: 'Une société', 2: 'Un individu' }, 
}

enums.whoWhat = whoWhat
/*WHO_WHAT*/

/*SECTORS*/
const sectors = {
    "keys": [0,1,2],
    "values": ['Je ne sais pas', 'Une société', 'Un individu'],
    "obj": { 0: 'Je ne sais pas', 1: 'Une société', 2: 'Un individu' }, 
}

enums.sectors = sectors
/*SECTORS mbola diso*/

export { enums }