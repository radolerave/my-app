// import Choices from 'choices.js'
// import { JSONEditor } from '@json-editor/json-editor'

let sellerForm = {
    name: "seller-form",
    content: /*html*/`
        <div id="sellerForm"></div>
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
                startVal: startVal,
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
                        'who_what': {
                            'type': 'string',
                            'title': 'Etes-vous une société ou un individu ?',
                            'enum': ['notHuman', 'human', ''],
                            'default': '',
                            'options': {
                                'enum_titles': ['Une société', 'Un individu', 'Je ne sais pas']
                            }
                        },
                        'activities': {
                            'type': 'array',
                            'format': 'table',
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
                            'format': 'table',
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
                            "format": "table",
                            "title": "Secteurs",
                            "uniqueItems": true,
                            "items": {
                                "type": "object",
                                "title": "secteur",
                                "properties": {
                                    "secteur": {
                                        "type": "integer",
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
                                        "type": "array",
                                        // "format": "table",
                                        "title": "détails",
                                        "uniqueItems": true,
                                        "items": {
                                            "type": "object",
                                            "title": "détail",
                                            "properties": {
                                                "city": {
                                                    "type": "string",
                                                    "title": "Ville"
                                                },
                                                "neighborhood": {
                                                    "type": "string",
                                                    "title": "Quartier"
                                                },
                                                "addresses": {
                                                    "type": "array",
                                                    "title": "Adresses",
                                                    "uniqueItems": true,
                                                    "items": {
                                                        "type": "object",
                                                        "title": "Adresse",
                                                        "properties": {
                                                            "wording": {
                                                                "type": "string",
                                                                "title": "libellé"
                                                            },
                                                            "address": {
                                                                "type": "string",
                                                                "title": "adresse"
                                                            },
                                                            "mapAddress": {
                                                                "type": "string",
                                                                "title": "adresse Map"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "contacts": {
                            "type": "array",
                            "title": "Contacts",
                            "uniqueItems": true,
                            "items": {
                                "type": "object",
                                "title": "contact",
                                "properties": {
                                    "wording": {
                                        "type": "string",
                                        "title": "libellé"
                                    },
                                    "phones": {
                                        "type": "array",
                                        "title": "téléphones",
                                        "uniqueItems": true,
                                        "items": {
                                            "type": "object",
                                            "title": "téléphone",
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
                            }
                        },
                        "space": {
                            "type": "object",
                            "title": "Mon espace",
                            "properties": {
                                "wording": {
                                    "type": "string",
                                    "title": "libellé"
                                },
                                "medias": {
                                    "type": "array",
                                    "title": "médias",
                                    "uniqueItems": true,
                                    "items": {
                                        "type": "object",
                                        "title": "Car",
                                        "properties": {
                                            "pictures": {
                                                "type": "array",
                                                "title": "Pictures",
                                                "items": {
                                                    "type": "object",
                                                    "title": "Image",
                                                    "format": "grid",
                                                    "properties": {
                                                        "file": {
                                                            "type": "string",
                                                            "title": "file",
                                                            "media": {
                                                                "binaryEncoding": "base64",
                                                                "type": "img/png"
                                                            },
                                                            "options": {
                                                                "grid_columns": 6,
                                                                "multiple": true,
                                                            }
                                                        },
                                                        "description": {
                                                            "type": "string",
                                                            "title": "Description",
                                                            "options": {
                                                                "grid_columns": 6
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            // console.log(form)
        }
    }
}

export { sellerForm }