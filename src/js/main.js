import { SplashScreen } from '@capacitor/splash-screen';
import { Camera } from '@capacitor/camera';
import { JSONEditor } from '@json-editor/json-editor';
import { Dexie } from 'dexie'
import FsDb from './model.js'
import Fs from './controller.js'

let myFs = new Fs()

myFs.initDb(FsDb, Dexie)
console.log("version : ", myFs.getVersion())

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
            'who_what',
            'keyword'
        ],
        'properties': {
            'country': {
                'type': 'string',
                'title': 'Pays',
                'enum': [
                    'Madagascar'
                ]
            },
            'who_what': {
                'type': 'string',
                'title': 'Vous recherchez qui/quoi ?',
                'enum': [
                    'Une personne',
                    'Une société',
                    'Autre'
                ]
            },
            'keyword': {
                'type': 'string',
                'title': 'Mot clé',
                'description': 'Mot clé',
                'minLength': 4,
                'default': 'ordinateur'
            }
        }
    }
});

editor.on('change', () => {
    document.querySelector('#editor_value').innerText = JSON.stringify(editor.getValue())
})