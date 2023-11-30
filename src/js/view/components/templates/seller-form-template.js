// import Choices from 'choices.js'
// import { JSONEditor } from '@json-editor/json-editor'
import { Dialog } from '@capacitor/dialog'
import { hourly } from "../../../helpers/hourlyFltapickrTemplate.js";
import { eventDate } from "../../../helpers/eventDateTemplate.js";
import MyMap from "../../../helpers/map.js"
import { sellerFormActionsTemplate } from './seller-form-actions-template.js';
import Formatter from "../../../helpers/formatter.js"

import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { Dexie } from 'dexie'
import { fsConfig } from './../../../config/fsConfig.js';

let myMap = new MyMap()

let sellerFormTemplate = {
    name: "seller-form-template",
    content: /*html*/`
        ${sellerFormActionsTemplate.content}

        <div id="sellerForm"></div>

        ${myMap.content} 

        <style>                        
            #seller-form-actions {
                border-bottom: solid grey 1px;
                box-shadow: 0 0 0.5em grey;
                border-width: 0;
                padding: 10px 0 10px 0;
                position: fixed;
                float: inline-end;
                width: 100%;
                background-color: white;
                z-index: 2;
            }
        </style>
    `,
    logic: (session) => {     
        const apiUrl = fsConfig.apiUrl  
        let myFs = new Fs(FsDb, Dexie)
        let myFormatter = new Formatter()

        sellerFormActionsTemplate.logic()

        const element = document.querySelector('#sellerForm');   
        let sellerInfos     

        if(element != null) {
            let startVal = { "country":"","name":"","who_what":"", "activity":"","keywords":"" }

            let form = new JSONEditor(element, {
                use_name_attributes: false,
                theme: 'bootstrap5',
                disable_edit_json: true,
                disable_properties: true,
                disable_collapse: true,
                iconlib: "bootstrap",
                // remove_button_labels: true,
                // startVal: startVal,
                schema: {
                    'title': 'Mon compte',
                    'type': 'object',
                    // 'required': [
                    //     'country',
                    //     'name',
                    //     'who_what',
                    //     'keywords'
                    // ],
                    'properties': {    
                        'country': {
                            'type': 'string',
                            // 'format': 'choices',
                            'format': 'select',
                            'title': 'Pays',
                            'enum': ["MG", "FR", "ESP", "US", "CN", "GB", "DE", "JP", ""],
                            'default': '',
                            'options': {
                                'enum_titles': [
                                    "Madagascar",
                                    "France",
                                    "Espagne",
                                    "États-Unis",
                                    "Chine",
                                    "Royaume-Uni",
                                    "Allemagne",
                                    "Japon",
                                    "Je ne sais pas"
                                ],
                                // 'choices': {
                                //     shouldSort: false,
                                //     allowHTML: true
                                // }
                            }
                        },                    
                        'name': {
                            'type': 'string',
                            'title': 'Nom ou Raison sociale'
                        },                    
                        'tradeName': {
                            'type': 'string',
                            'title': 'Nom Commercial'
                        },
                        'who_what': {
                            'type': 'integer',
                            // 'format': 'choices',
                            'format': 'select',
                            'title': 'Société ou individu ?',
                            'enum': [0,1,2],
                            'default': 0,
                            'options': {
                                'enum_titles': ['Je ne sais pas', 'Une société', 'Un individu'],
                                // 'choices': {
                                //     shouldSort: false,
                                //     allowHTML: true
                                // }
                            }
                        },                    
                        'nif': {
                            'type': 'string',
                            'title': 'NIF'
                        },                    
                        'stat': {
                            'type': 'string',
                            'title': 'STAT'
                        },                    
                        'rcs': {
                            'type': 'string',
                            'title': 'RCS'
                        },                    
                        'cin': {
                            'type': 'string',
                            'title': 'N° CIN',
                            "options": {
                                "dependencies": {
                                    "root.who_what": 2
                                }
                            }
                        },
                        'activities': {
                            'type': 'array',
                            'format': 'tabs-top',
                            "maxItems": 10,
                            'title': 'Activités',
                            'uniqueItems': true,
                            'items': {
                                'type': 'object',
                                'title': 'activité',
                                'properties': {
                                    'activity': {
                                        'type': 'string',
                                        'title': 'activité'
                                    }
                                }                            
                            }
                        },
                        'keywords': {
                            'type': 'array',
                            'format': 'tabs-top',
                            "maxItems": 5,
                            'title': 'Mots clés',
                            'uniqueItems': true,
                            'items': {
                                'type': 'object',
                                'title': 'mot clé',
                                'properties': {
                                    'keyword': {
                                        'type': 'string',
                                        'title': 'mot clé'
                                    }
                                }                            
                            }
                        },
                        "sectors": {
                            "type": "array",
                            "format": "tabs-top",
                            // "maxItems": 10,
                            "title": "Secteurs",
                            "uniqueItems": true,
                            "items": {
                                "type": "object",
                                "title": "secteur",
                                "properties": {
                                    "sector": {
                                        "type": "integer",
                                        "title": "secteur",
                                        // 'format': 'choices',
                                        'format': 'select',
                                        "enum": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
                                        // "default": "",
                                        "options": {
                                            "enum_titles": [
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
                                            ],
                                            // 'choices': {
                                            //     shouldSort: false,
                                            //     allowHTML: true
                                            // }
                                        }
                                    }
                                }
                            }
                        },
                        "localities": {
                            "type": "array",   
                            "format": "tabs-top",
                            "title": "Localités",                        
                            "uniqueItems": true,
                            "items": {
                                "type": "object",
                                "title": "localité",
                                "properties": {                                    
                                    "locality": {
                                        "type": "string",
                                        "title": "Nom de l'emplacement"
                                    },
                                    "locality_details": {
                                        "type": "object",
                                        "title": "détails",
                                        "id": "locality_details",
                                        "properties": {
                                            "city": {
                                                "type": "string",
                                                "title": "ville"
                                            },
                                            "neighborhood": {
                                                "type": "string",
                                                "title": "quartier"
                                            },
                                            "address": {
                                                "type": "string",
                                                "format": "textarea",
                                                "title": "adresse"
                                            },
                                            "mapAddress": {
                                                "type": "string",
                                                "format": "textarea",
                                                "options": {
                                                    "containerAttributes": {
                                                        "class": "ion-hide"
                                                    }
                                                }
                                            },
                                            "mapAddressWording": {
                                                "type": "string",
                                                "format": "textarea",
                                                "title": "adresse Map",
                                                "template": "mapAddressCallbackFunction",
                                                "watch": {
                                                    "map": "locality_details.mapAddress"
                                                }
                                            },
                                            "description": {
                                                "type": "string",
                                                "format": "textarea",
                                                "title": "description"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "hourly": {
                            "type": "object",
                            "title": "Horaires d'ouverture",
                            "properties": hourly
                        },
                        "calendar": {
                            "type": "array",
                            "format": "tabs-top",
                            "title": "Calendrier",
                            // "id": "calendar",
                            "items": {
                                "type": "object",
                                "title": "Evènement",
                                "properties": {
                                    "eventTitle": {
                                        "type": "string",
                                        "title": "Titre de l'évènement"
                                    },
                                    "allDay": {
                                        "type": "boolean",
                                        "format": "checkbox",
                                        "title": "Toute la journée"
                                    },
                                    "isRange": {
                                        "type": "boolean",
                                        "format": "checkbox",
                                        "title": "Intervalle"
                                    },
                                    "date": eventDate.date,
                                    "dateRange": eventDate.dateRange,
                                    "dateTime": eventDate.dateTime,
                                    "dateTimeRange": eventDate.dateTimeRange,
                                    "eventLocation": {
                                        "type": "string",
                                        "title": "Lieux"
                                    },
                                    "description": {
                                        "type": "string",
                                        "format": "textarea",
                                        "title": "Description"
                                    }
                                }
                            }
                        },
                        "contacts": {
                            "type": "object",
                            "title": "Contacts",
                            "properties": {
                                "phones": {
                                    "type": "array",
                                    "format": "tabs-top",
                                    "maxItems": 10,
                                    "title": "téléphones",
                                    "uniqueItems": true,
                                    "items": {
                                        "type": "object",
                                        "title": "tél",
                                        "properties": {
                                            "wording": {
                                                "type": "string",
                                                "title": "libellé"
                                            },
                                            "phoneType": {
                                                'type': 'integer',
                                                // 'format': 'choices',
                                                'format': 'select',
                                                'title': 'Type de tél',
                                                'enum': [0,1,2,3,4],
                                                'default': 0,
                                                'options': {
                                                    'enum_titles': ['Mobile', 'Fixe', 'WhatsApp', 'Viber', 'Skype'],
                                                    // 'choices': {
                                                    //     shouldSort: false,
                                                    //     allowHTML: true
                                                    // }
                                                }
                                            },
                                            "phone": {
                                                "type": "string",
                                                "title": "n° téléphone"
                                            }
                                        }
                                    }
                                },
                                "emails": {
                                    "type": "array",
                                    "format": "tabs-top",
                                    "maxItems": 10,
                                    "title": "emails",
                                    "uniqueItems": true,
                                    "items": {
                                        "type": "object",
                                        "title": "email",
                                        "properties": {
                                            "wording": {
                                                "type": "string",
                                                "title": "libellé"
                                            },
                                            "email": {
                                                "type": "string",
                                                "title": "adresse email"
                                            }
                                        }
                                    }
                                },
                                "links": {
                                    "type": "array",
                                    "format": "tabs-top",
                                    "maxItems": 10,
                                    "title": "liens",
                                    "uniqueItems": true,
                                    "items": {
                                        "type": "object",
                                        "title": "lien",
                                        "properties": {
                                            "wording": {
                                                "type": "string",
                                                "title": "libellé"
                                            },
                                            "linkType": {
                                                'type': 'integer',
                                                // 'format': 'choices',
                                                'format': 'select',
                                                'title': 'Type de lien',
                                                'enum': [0,1,2,3,4],
                                                'default': 0,
                                                'options': {
                                                    'enum_titles': ['Site WEB', 'Facebook', 'Instagram', 'Linkedin', 'Twitter'],
                                                    // 'choices': {
                                                    //     shouldSort: false,
                                                    //     allowHTML: true
                                                    // }
                                                }
                                            },
                                            "link": {
                                                "type": "string",
                                                "title": "lien"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "space": {
                            "type": "object",
                            "title": "Mon espace",
                            "properties": {
                                "enable_space": {
                                    "type": "object",
                                    "title": "statut de cet espace",
                                    "properties": {
                                        "enabled": {
                                            "type": "boolean",
                                            "format": "checkbox",
                                            "title": "activé"
                                        }
                                    }
                                },
                                "wording": {
                                    "type": "string",
                                    "title": "Nom de mon espace"
                                },
                                "medias": {
                                    "type": "object",
                                    "title": "Médias & publications",
                                    "properties": {
                                        "information": {
                                            "type": "info",
                                            "title": "Information",
                                            "description": "Pour gérer vos médias et vos publications, veuillez appuyer sur le bouton ci-après."
                                        },
                                        "mediaButton": {
                                            "type": "button",
                                            "title": "Gérer",
                                            "options": {
                                                "button": {
                                                    "icon": "collection-play-fill",
                                                    "action": "manageSellerMedia",
                                                    "validated": "manageSellerMedia"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "format": "categories",
                    "basicCategoryTitle": "Informations",
                    // "remove_empty_properties": true
                }
            });           

            JSONEditor.defaults.callbacks = {
                "button" : {
                    "manageSellerMedia" : async function (jseditor, e) {
                        const navigation = document.querySelector("ion-nav#navigation") 
                        await navigation.push("medias-or-publications-choice")

                        fsGlobalVariable.sellerInfos = form.getValue()
                    }
                }
            }
            
            JSONEditor.defaults.callbacks.template = {               
                "mapAddressCallbackFunction": (jseditor,e) => {
                    let latLng

                    try {
                        latLng = JSON.parse(e.map)

                        latLng = `[${latLng.lat}, ${latLng.lng}]`
                    }
                    catch(err) {
                        latLng = ""
                    }
                    
                    return latLng
                }
            }            

            let changeCount = 0//ignore the first fired change event
            const editBtn = document.querySelector("#editMyAccountData")
            const undoBtn = document.querySelector("#undoMyAccountData")
            const saveBtn = document.querySelector("#saveMyAccountData")  
            const lockBtn = document.querySelector("#lockMyAccountData")     
            let finalData = {
                "updatedData": {},
                "credentials": {}
            }                 

            let mapInstance

            async function showMaps(jsonEditorInstance) {
                try {
                    if(typeof mapInstance == "undefined") {
                        mapInstance = await myMap.logic(jsonEditorInstance).createMap()
                    }
                }
                catch(err) {
                    console.log("Error when trying to initialize map", err)
                }

                document.querySelector("#mapDescription").classList.remove("ion-hide")
            }

            function hideMaps(jsonEditorInstance) {
                if (typeof mapInstance !== 'undefined' && mapInstance instanceof L.Map) { 
                    myMap.logic(jsonEditorInstance).removeMap()
                    mapInstance = undefined
                    document.querySelector("#map").setAttribute("class", "")                    
                }

                document.querySelector("#mapDescription").classList.add("ion-hide")
            }
            
            form.on('ready', async () => {
                //get the seller infos  
                const response = await myFs.getSellerInfos(apiUrl, session.seller_id)

                if(response.ok) {                    
                    sellerInfos = response.sellerInfos
        
                    console.log(sellerInfos)

                    const lastEdit = sellerInfos.last_edit
                    const dateAdd = sellerInfos.date_add

                    delete sellerInfos.last_edit
                    delete sellerInfos.date_add
        
                    form.setValue(sellerInfos)

                    const lastModificationDate = myFormatter.dateFormatter(lastEdit.replace(" ", "T"), true)

                    console.log(lastModificationDate)

                    document.querySelector("#seller-form-actions #last_edit").textContent = lastModificationDate
                }
                else 
                {
                    console.log(response.error)

                    const myAccountContent = document.querySelector("#my-account-template-content")

                    if(!myAccountContent.classList.contains("notConnected")) myAccountContent.classList.add("notConnected") 

                    myAccountContent.innerHTML = /*html*/`
                        <div>
                            <ion-icon name="cloud-offline-outline" color="medium" style="font-size: 128px;"></ion-icon>
                            <div>Vérifiez votre connexion!</div>
                        </div>
                    `
                }
                //////////////////////////////

                editBtn.classList.remove("ion-hide")

                const disableTheseInputs = document.querySelectorAll(".disableThisAltInputFirst")

                disableTheseInputs.forEach((el) => {
                    el.setAttribute("disabled", "disabled")
                })

                form.disable();     

                console.log(form)
                console.log(form.getValue())      
                
                const watcherCallback = function (path) {
                    try {
                        // console.log(`field with path: [${path}] changed to [${JSON.stringify(this.getEditor(path).getValue())}]`);

                        let fieldName = path.replace(/root\./g, "").replace(/\..*/g, "")                        
                        
                        if(fieldName == "calendar") {
                            let realDataInDb = []

                            this.getEditor(`root.${fieldName}`).getValue().forEach((value, index) => {
                                const obj = {//the data in the db must contains each property
                                    "eventTitle": "",
                                    "date": "",
                                    "dateRange": "",
                                    "dateTime": "",
                                    "dateTimeRange": "",
                                    "eventLocation": ""
                                }

                                if(typeof value.eventTitle == "undefined") value.eventTitle = ""
                                if(typeof value.date == "undefined") value.date = ""
                                if(typeof value.dateRange == "undefined") value.dateRange = ""
                                if(typeof value.dateTime == "undefined") value.dateTime = ""
                                if(typeof value.dateTimeRange == "undefined") value.dateTimeRange = ""
                                if(typeof value.eventLocation == "undefined") value.eventLocation = ""

                                let data = Object.assign(obj, value)
                                
                                realDataInDb.push(data)
                            })

                            finalData["updatedData"][fieldName] = realDataInDb
                        }
                        else {
                            finalData["updatedData"][fieldName] = this.getEditor(`root.${fieldName}`).getValue()
                        }

                        // console.log("finalData", finalData)
                    }
                    catch(err) {
                        console.log("misy error fa alefa ihany aloha")
                    }
                }
    
                for (let key in form.editors) {
                    if (form.editors.hasOwnProperty(key) && key !== 'root') {
                        form.watch(key, watcherCallback.bind(form, key));
                    }
                }

                const jsonEditorNavItems = document.querySelectorAll('div[data-schemapath="root"]>div>div>div>ul>li.nav-item:not([style="display: none;"])')

                jsonEditorNavItems.forEach((el, index) => {
                    el.addEventListener("click", (event) => {
                        // const clickedElement = event.target

                        // alert(index)
                        // console.log(clickedElement.closest("li"))
                        // console.log(form.root.active_tab)

                        if(index == 4){//locality - then showMaps()
                            document.querySelector('div[data-schemapath="root.localities"]').setAttribute("the-concerned-locality-index", Array.prototype.indexOf.call(document.querySelectorAll('div[data-schemapath="root.localities"] li.nav-item:not([style="display: none;"]) a.nav-link'), document.querySelector('div[data-schemapath="root.localities"] li.nav-item:not([style="display: none;"]) a.nav-link.active')))
                            
                            if(form.isEnabled()) {
                                showMaps(form)
                            }
                        }
                        else {
                            hideMaps(form)
                        }
                    })
                })

                form.on('change', async (e) => {
                    if(changeCount > 0) {                    
                        saveBtn.classList.remove("ion-hide")
                        undoBtn.classList.remove("ion-hide")
                        console.log(form.getValue())

                        try {
                            const jsonEditorLocalitiesNavItems = document.querySelectorAll('div[data-schemapath="root.localities"] li.nav-item:not([style="display: none;"]) a.nav-link')
                            
                            jsonEditorLocalitiesNavItems.forEach((el, index) => {
                                if(el.classList.contains("active")) {
                                    document.querySelector('div[data-schemapath="root.localities"]').setAttribute("the-concerned-locality-index", index)                                    
    
                                    myMap.index = index
                                    myMap.removeAllMarkers()

                                    console.log(myMap.index)

                                    myMap.logic(form).locateTheCurrentMapAddress()
                                }
    
                                if(!el.hasAttribute('data-click-attached')) {
                                    el.addEventListener("click", (event) => {
                                        // const clickedElement = event.target
    
                                        // alert(index)
                                        // console.log(clickedElement.closest("li"))
                                        // console.log(form.root.active_tab)
    
                                        console.log(index)
    
                                        document.querySelector('div[data-schemapath="root.localities"]').setAttribute("the-concerned-locality-index", index)
    
                                        myMap.index = index
                                        myMap.removeAllMarkers()
                                        myMap.logic(form).locateTheCurrentMapAddress()
                                    })
    
                                    el.setAttribute('data-click-attached', 'true')                                
                                }                            
                            }) 
                        }
                        catch(err) {
                            console.log("map not yet initialized: ", /*err*/)
                        }                        
                    }
    
                    changeCount++                                  
                })
    
                editBtn.addEventListener("click", () => {
                    const enableTheseInputs = document.querySelectorAll(".disableThisAltInputFirst")

                    enableTheseInputs.forEach((el) => {
                        el.removeAttribute("disabled")
                    })

                    if(!form.isEnabled()) {
                        form.enable()
                        
                        const detectIfLocalityTabChoosen = Array.prototype.indexOf.call(document.querySelectorAll('div[data-schemapath="root"]>div>div>div>ul>li.nav-item a.nav-link'), document.querySelector('div[data-schemapath="root"]>div>div>div>ul>li.nav-item a.nav-link.active'))

                        if(detectIfLocalityTabChoosen == 4) {//locality - then showMaps()
                            showMaps(form)
                        }
                    }
                    
                    !editBtn.classList.contains("ion-hide") ? editBtn.classList.add("ion-hide") : null
                    lockBtn.classList.remove("ion-hide")
                }) 

                undoBtn.addEventListener("click", () => {
                    changeCount = 0//important!!!

                    console.log(sellerInfos)
        
                    form.setValue(sellerInfos)

                    form.disable()
                    hideMaps(form)

                    const enableTheseInputs = document.querySelectorAll(".disableThisAltInputFirst")

                    enableTheseInputs.forEach((el) => {
                        el.setAttribute("disabled", "true")
                    })


                    editBtn.classList.remove("ion-hide")
                    undoBtn.classList.add("ion-hide")
                    saveBtn.classList.add("ion-hide")
                    lockBtn.classList.add("ion-hide")
                })

                saveBtn.addEventListener("click", async () => {
                    finalData["credentials"] = {
                        "sellerId" : session.seller_id,
                        "email": session.email,
                        "password": session.password,
                        "accountId": session.id
                    }                 

                    // console.log(finalData)

                    const response = await myFs.accountInfosUpdate(apiUrl, finalData) 
                    
                    if(response.ok) {
                        sellerInfos = form.getValue()

                        const lastModificationDate = myFormatter.dateFormatter(response.date, true)

                        document.querySelector("#seller-form-actions #last_edit").textContent = lastModificationDate

                        if(form.isEnabled()) form.disable()
                        hideMaps(form)
                        
                        editBtn.classList.remove("ion-hide")
                        undoBtn.classList.add("ion-hide")
                        saveBtn.classList.add("ion-hide")
                        lockBtn.classList.add("ion-hide")
                    }
                    else {
                        await Dialog.alert({
                            "title": `Erreur`,
                            "message": `${response.errorText}`
                        })
                    }
                })

                lockBtn.addEventListener("click", async () => {
                    if(form.isEnabled()) form.disable()
                    hideMaps(form)

                    const enableTheseInputs = document.querySelectorAll(".disableThisAltInputFirst")

                    enableTheseInputs.forEach((el) => {
                        el.setAttribute("disabled", "true")
                    })

                    lockBtn.classList.add("ion-hide")
                    editBtn.classList.remove("ion-hide")
                })
            })                       
        }
    }
}

export { sellerFormTemplate }