// import Choices from 'choices.js'
// import { JSONEditor } from '@json-editor/json-editor'
import { hourly } from "../../../helpers/hourlyFltapickrTemplate.js";
import MyMap from "../templates/map.js"

const apiUrl = 'https://server2.atria.local/findseller/api.php/records/sellers'

let myMap = new MyMap()

let sellerForm = {
    name: "seller-form",
    content: /*html*/`
        <div id="sellerForm"></div>

        ${myMap.content} 
    `,
    logic: () => {       
        

        const element = document.querySelector('#sellerForm');        

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
                    'title': 'Title : -Seller Name-',
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
                            'format': 'choices',
                            'title': 'Localisation',
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
                                'choices': {
                                    shouldSort: false,
                                    allowHTML: true
                                }
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
                            'type': 'string',
                            "format": "choices",
                            'title': 'Etes-vous une société ou un individu ?',
                            'enum': ['notHuman', 'human', ''],
                            'default': '',
                            'options': {
                                'enum_titles': ['Une société', 'Un individu', 'Je ne sais pas'],
                                'choices': {
                                    shouldSort: false,
                                    allowHTML: true
                                }
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
                                    "root.who_what": "human"
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
                            "format": "tabs",
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
                                        "format": "choices",
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
                                                "Mode et Beauté",
                                                "Publicité et Marketing",
                                                "Santé et Pharmaceutique",
                                                "Services Financiers et Bancaires",
                                                "Services Professionnels",
                                                "Technologie, Informatique et Télécommunications",
                                                "Tourisme et Hôtellerie",
                                                "Transport et Logistique"
                                            ],
                                            'choices': {
                                                shouldSort: false,
                                                allowHTML: true
                                            }
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
                                                "title": "Ville"
                                            },
                                            "neighborhood": {
                                                "type": "string",
                                                "title": "Quartier"
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
                                                "title": "adresse Map",
                                                "template": "{{ map }}",
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
                            "items": {
                                "type": "object",
                                "title": "évènement",
                                "properties": {
                                    "date": {
                                        "type": "string",
                                        "format": "date",
                                        "title": "date",
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
                                            }
                                        }
                                    },
                                    "description": {
                                        "type": "string",
                                        "format": "textarea",
                                        "title": "description"
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
                                            "protocol": {
                                                "type": "string",
                                                "title": "protocole"
                                            },
                                            "lien": {
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
                                    "type": "array",
                                    "format": "tabs-top",
                                    "maxItems": 5,
                                    "uniqueItems": true,
                                    "title": "médias",
                                    "items": {
                                        "type": "object",
                                        "title": "média",
                                        "properties": {
                                            "enable_media": {
                                                "type": "object",
                                                "title": "statut de ce média",
                                                "properties": {
                                                    "enabled": {
                                                        "type": "boolean",
                                                        "format": "checkbox",
                                                        "title": "activé"
                                                    }
                                                }
                                            },
                                            "file": {
                                                "type": "string",
                                                "title": "fichier",
                                                "media": {
                                                    "binaryEncoding": "base64",
                                                    // "type": "image/png"
                                                },
                                                "options": {
                                                    "multiple": true,
                                                },
                                                // "links": [
                                                //     {
                                                //         "href": "{{self}}",
                                                //         "rel": "Aperçu",
                                                //         "class": "font-weight-bold"
                                                //     }
                                                // ]
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

            let changeCount = 0//ignore the first fired change event
            const editBtn = document.querySelector("#editMyAccountData")
            const saveBtn = document.querySelector("#saveMyAccountData")       
            let finalData = {
                "updatedData": {},
                "credentials": {}
            }     

            function accountInfosUpdate(url, args) {
                // Construct the API endpoint URL for updating the item
                const updateUrl = `${url}/${args.credentials.sellerId}`;
                const updatedData = args.updatedData

                //do a verification process before continuing*********** (credentials)

                // Send a PUT request to update the item
                fetch(updateUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any necessary authentication headers here
                    },
                    body: JSON.stringify(updatedData),
                })
                .then(response => response.json())
                .then(updatedItem => {
                    console.log('Updated item:', updatedItem);
                    // Handle success or do something with the updated item data
                })
                .catch(error => {
                    console.error('Error updating item:', error);
                    // Handle error
                });
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
                const sellerId = 1
                const columns = `activities,contacts,country,keywords,localities,name,sectors,space,who_what,hourly,calendar,nif,stat,rcs,cin,tradeName`

                try {
                    let sellerInfos = await fetch(`${apiUrl}/${sellerId}?include=${columns}`)
                    sellerInfos = await sellerInfos.json()
                    // sellerInfos = sellerInfos.records
        
                    console.log(sellerInfos)
        
                    form.setValue(sellerInfos)
                }
                catch(err) {
                    console.log(err)
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
                
                // const watcherCallback = function (path) {
                //     console.log(`field with path: [${path}] changed to [${JSON.stringify(this.getEditor(path).getValue())}]`);

                //     let fieldName = path.replace(/root\./g, "").replace(/\..*/g, "")

                //     finalData["updatedData"][fieldName] = this.getEditor(`root.${fieldName}`).getValue()

                //     console.log("finalData", finalData)

                //     if(fieldName == "localities") {                                                
                //         const jsonEditorLocalitiesNavItems = document.querySelectorAll('div[data-schemapath="root.localities"] li.nav-item a.nav-link')
                        
                //         jsonEditorLocalitiesNavItems.forEach((el, index) => {
                //             if(el.classList.contains("active")) {
                //                 document.querySelector('div[data-schemapath="root.localities"]').setAttribute("the-concerned-locality-index", index)

                //                 myMap.index = index
                //                 myMap.removeAllMarkers()
                //                 myMap.logic(form).locateTheCurrentMapAddress()
                //             }

                //             if(!el.hasAttribute('data-click-attached')) {
                //                 el.addEventListener("click", (event) => {
                //                     // const clickedElement = event.target

                //                     // alert(index)
                //                     // console.log(clickedElement.closest("li"))
                //                     // console.log(form.root.active_tab)

                //                     console.log(index)

                //                     document.querySelector('div[data-schemapath="root.localities"]').setAttribute("the-concerned-locality-index", index)

                //                     myMap.index = index
                //                     myMap.removeAllMarkers()
                //                     myMap.logic(form).locateTheCurrentMapAddress()
                //                 })

                //                 el.setAttribute('data-click-attached', 'true')                                
                //             }                            
                //         })                        
                //     }
                // }
    
                // for (let key in form.editors) {
                //     if (form.editors.hasOwnProperty(key) && key !== 'root') {
                //         form.watch(key, watcherCallback.bind(form, key));
                //     }
                // }

                const jsonEditorNavItems = document.querySelectorAll('div[data-schemapath="root"]>div>div>div>ul>li.nav-item')

                jsonEditorNavItems.forEach((el, index) => {
                    el.addEventListener("click", (event) => {
                        // const clickedElement = event.target

                        // alert(index)
                        // console.log(clickedElement.closest("li"))
                        // console.log(form.root.active_tab)

                        if(index == 4){//locality - then showMaps()
                            document.querySelector('div[data-schemapath="root.localities"]').setAttribute("the-concerned-locality-index", Array.prototype.indexOf.call(document.querySelectorAll('div[data-schemapath="root.localities"] li.nav-item a.nav-link'), document.querySelector('div[data-schemapath="root.localities"] li.nav-item a.nav-link.active')))
                            
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
                        console.log(form.getValue())

                        try {
                            const jsonEditorLocalitiesNavItems = document.querySelectorAll('div[data-schemapath="root.localities"] li.nav-item a.nav-link')
                            
                            jsonEditorLocalitiesNavItems.forEach((el, index) => {
                                if(el.classList.contains("active")) {
                                    document.querySelector('div[data-schemapath="root.localities"]').setAttribute("the-concerned-locality-index", index)
    
                                    myMap.index = index
                                    myMap.removeAllMarkers()
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
                            console.log("map not yet initialized: ", err)
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
                }) 

                saveBtn.addEventListener("click", () => {
                    //supposed been connected with: sellerId : 1 & sellerUniqueId : pim ...
                    finalData["credentials"] = {
                        "sellerId" : 1,
                        "sellerUniqueId" : "pim",
                        "email": "radolerave@gmail.com",
                        "password": "password",
                        "accountId": 1
                    }                 

                    // console.log(finalData)

                    accountInfosUpdate(apiUrl, finalData)                    
                })
            })                       
        }
    }
}

export { sellerForm }