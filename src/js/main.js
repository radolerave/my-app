import { SplashScreen } from '@capacitor/splash-screen'
import { Camera } from '@capacitor/camera'
import { JSONEditor } from '@json-editor/json-editor'
import { Dexie } from 'dexie'
import FsDb from './model.js'
import Fs from './controller.js'
import { Grid } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

let myFs = new Fs(FsDb, Dexie)
console.log(myFs)

// console.log("version : ", myFs.getVersion())

const element = document.querySelector('#criteria');
let startVal = { "country":"","name":"","who_what":"","keyword":"","combinedCriteria":"" }

let editor = new JSONEditor(element, {
    use_name_attributes: false,
    theme: 'bootstrap5',
    disable_edit_json: true,
    disable_properties: true,
    // disable_collapse: true,
    iconlib: "bootstrap",
    // remove_button_labels: true,
    startVal: startVal,
    schema: {
        'title': 'à vous de jouer maintenant !',
        'type': 'object',
        // 'required': [
        //     'country',
        //     'name',
        //     'who_what',
        //     'keyword'
        // ],
        'properties': {
            'resetCriteria': {
                'type': 'button',
                'title': 'Réinitialiser',
                'options': {
                    'button': {
                        'icon': 'arrow-clockwise',
                        'action': 'resetCriteria',
                        'validated': true
                    }
                }
            },
            'info': {
                "type": "info",
                "title": "",
                "description": "Spécifiez vos critères"
            },
            'country': {
                'type': 'string',
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
                    ]
                }
            },
            'name': {
                'type': 'string',
                'title': 'Nom ou Raison sociale'
            },
            'who_what': {
                'type': 'string',
                'title': 'Vous recherchez qui/quoi ?',
                'enum': ['notHuman', 'human', ''],
                'default': '',
                'options': {
                    'enum_titles': ['Une société', 'Un individu', 'Je ne sais pas']
                }
            },
            'keyword': {
                'type': 'string',
                'title': 'Mot clé',
                'description': 'Mot clé',
                // 'minLength': 2,
                // 'default': 'ordinateur'
            },
            "combinedCriteria": {
                "type": "string",
                'title': 'Résumé',
                "template": "{{c}}{{n}}{{w}}{{k}}",
                "watch": {
                    "c": "country",
                    "n": "name",
                    "w": "who_what",
                    "k": "keyword"
                }
            },            
            'validateCriteria': {
                'type': 'button',
                'title': 'Allons-y !',
                'options': {
                    'button': {
                        'icon': 'check',
                        'action': 'validateCriteria',
                        // 'validated': true
                    },
                    'dependencies': {
                        'root.combinedCriteria': true //we want combinedCriteria to be a not empty string
                    }
                }
            }
        }
    }
});

const results = document.querySelector('#results')
const gridOptions = {
    columnDefs: [
        // { headerName: 'Id', field: 'id' },
		{ headerName: 'Nom', field: 'name' },
		// { headerName: 'Qui/Quoi', field: 'who_what' },
		// { headerName: 'Mots Clés', field: 'keyword' },
		{ headerName: 'Num Tél', field: 'phone' }
    ],
    defaultColDef: {sortable: true, filter: true, suppressMovable: true},
    rowSelection: 'multiple',
    pagination: true,
    paginationPageSize: 5,
    rowData: []
}

const grid = new Grid(results, gridOptions);

// Custom validators must return an array of errors or an empty array if valid
// JSONEditor.defaults.custom_validators.push((schema, value, path) => {
//     const errors = [];
//     if (path=="root.name") {
//         if (value != "xou") {
//             // Errors must be an object with `path`, `property`, and `message`
//             errors.push({
//                 path: path,
//                 property: 'type',
//                 message: 'ilaina ny xou'
//             });
//         }
//     }
//     return errors;
// });

JSONEditor.defaults.callbacks = {
    "button" : {
        "resetCriteria" : function (jseditor, e) {   
            document.querySelector('#filterResults').value = '' 
            !document.querySelector('#filterResults').classList.contains('ion-hide') ? document.querySelector('#filterResults').classList.add('ion-hide') : ""
            !document.querySelector('#results').classList.contains('ion-hide') ? document.querySelector('#results').classList.add('ion-hide') : ""

            gridOptions.api.setQuickFilter('')   
            // gridOptions.api.setFilterModel(null)
            gridOptions.api.setRowData([])
            gridOptions.columnApi.applyColumnState({
                defaultState: { sort: null },
            });

            editor.setValue(startVal)            
        },
        "validateCriteria" : async function (jseditor, e) {
            editor.getEditor('root.validateCriteria').disable() //disable this button just after validating criteria
            const findCriteria = editor.getValue()
            // document.querySelector('#criteria_value').innerText = JSON.stringify(findCriteria)

            const params = {
                'where': {
                    'country': findCriteria.country,
                    'name': findCriteria.name,
                    'who_what': findCriteria.who_what,
                    'keyword': findCriteria.keyword
                }
            }   

            const promesse = () => {
                return new Promise(async resolve => {
                    resolve(await myFs.getData(params))
                }, reject => {
                    reject('xou')
                })
            }

            const data = await promesse()

            console.log(data)

            //Collapse the editor
            document.querySelector('#criteria h3 button.json-editor-btn-collapse').click()
            
            //show the results filtering
            document.querySelector('#filterResults').classList.remove('ion-hide')

            //show the results
            document.querySelector('#results').classList.remove('ion-hide')
            gridOptions.api.setRowData(data);
        }
    }
}

editor.on('change', async () => {    
    // const findCriteria = editor.getValue()
    // document.querySelector('#criteria_value').innerText = JSON.stringify(findCriteria)

    const combinedCriteria = document.querySelector('div[data-schemapath="root.combinedCriteria"]').parentElement
    const filterResults = document.querySelector('#filterResults')
    const results = document.querySelector('#results')
    
    if(!combinedCriteria.classList.contains('ion-hide')) {
        combinedCriteria.classList.add('ion-hide')
    }

    if(!filterResults.classList.contains('ion-hide')) {
        filterResults.classList.add('ion-hide')
    }
    
    if(!results.classList.contains('ion-hide')) {
        results.classList.add('ion-hide')
    }

    editor.getEditor('root.validateCriteria').enable() //enable this button after updating criteria
})

document.querySelector('#filterResults').addEventListener("ionInput", (ev) => {
    // console.log(ev.target)
    gridOptions.api.setQuickFilter(ev.target.value)
})

// document.querySelector('#find').addEventListener('click', () => {
//     alert('xou')
// })