import { SplashScreen } from '@capacitor/splash-screen'
import { Camera } from '@capacitor/camera'
import { JSONEditor } from '@json-editor/json-editor'
import { Dexie } from 'dexie'
import FsDb from './model.js'
import Fs from './controller.js'
import { Grid } from "gridjs"
import "gridjs/dist/theme/mermaid.css"

let myFs = new Fs(FsDb, Dexie)
console.log(myFs)

let findCriteria

// console.log("version : ", myFs.getVersion())

const element = document.querySelector('#editor_holder');

let editor = new JSONEditor(element, {
    use_name_attributes: false,
    theme: 'bootstrap5',
    disable_edit_json: true,
    disable_properties: true,
    disable_collapse: true,
    schema: {
        'title': 'Find Seller',
        'type': 'object',
        'required': [
            'country',
            'name',
            'who_what',
            'keywords'
        ],
        'properties': {
            'country': {
                'type': 'string',
                'title': 'Pays',
                'enum': ['MG', 'ESP', 'FR', 'XXX'],
                'default': 'XXX',
                'options': {
                    'enum_titles': ['Madagascar', 'Espagne', 'France', '---Autre---']
                }
            },
            'name': {
                'type': 'string',
                'title': 'Nom ou Raison sociale'
            },
            'who_what': {
                'type': 'string',
                'title': 'Vous recherchez qui/quoi ?',
                'enum': ['2', '1', '0'],
                'default': '0',
                'options': {
                    'enum_titles': ['Une société', 'Un individu', '---Autre---']
                }
            },
            'keywords': {
                'type': 'string',
                'title': 'Mots clés',
                'description': 'Mot clé',
                'minLength': 2,
                // 'default': 'ordinateur'
            }
        }
    }
});

const grid = new Grid({
    columns: ['id', 'name', 'who_what', 'keywords', 'phone'],
    sort: true,
    data: []
});

grid.render(document.querySelector('#results'))

editor.on('change', () => {    
    findCriteria = editor.getValue()
    document.querySelector('#editor_value').innerText = JSON.stringify(findCriteria)

    grid.updateConfig({
        data: () => {
            return new Promise(async resolve => {
                const params = {
                    'where': {
                        'country': findCriteria.country,
                        'name': findCriteria.name,
                        'who_what': findCriteria.who_what,
                        'keywords': findCriteria.keywords
                    }
                }            
                
                const data = await myFs.getData(params)
    
                resolve(data)
            }, reject => {
                reject('xou')
            })
        }
    }).forceRender()
})

// document.querySelector('#find').addEventListener('click', () => {
//     alert('xou')
// })