// import { JSONEditor } from '@json-editor/json-editor'
import { Grid } from 'ag-grid-community';
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { leftMenu } from './../templates/left-menu.js'
import { rightMenu } from './../templates/right-menu.js'

let mainPage = {
  name: "main-page",
  content: /*html*/`
    ${leftMenu.content}
    ${rightMenu.content}    

    <div class="ion-page" id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button menu="menu"></ion-menu-button>
          </ion-buttons>

          <ion-buttons slot="end">
            <ion-menu-button menu="menu2">
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </ion-menu-button>              
          </ion-buttons>
          
          <ion-title>Find Seller</ion-title>
          <!-- <ion-searchbar placeholder="Recherche" id="search" debounce="250" color="light"></ion-searchbar>
          <ion-button class="ion-hide" id="additionalSearchBtn" size="small">Ou</ion-button>
          <ion-searchbar class="ion-hide" id="additionalSearch" placeholder="Recherche supplémentaire" debounce="250" color="light"></ion-searchbar> -->
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">          
        <div id="criteria"></div>

        <ion-button id="validateCriteria" class="ion-hide" disabled="true">Allons-y !</ion-button>
        <ion-button id="resetCriteria" class="ion-hide" color="danger" disabled="true">Réinitialiser</ion-button>

        <!-- <div id="criteria_value"></div> -->
        
        <ion-searchbar type="text" id="filterResults" placeholder="Plus de précision..." class="ion-hide ion-no-padding"></ion-searchbar>
        <div id="results" style="height: 70vh; width: 100%" class="ag-theme-alpine ion-hide"></div>

      </ion-content>
    </div>
    `,
  logic: async () => {
    let myFs = new Fs(FsDb, Dexie)
    console.log(myFs)

    const element = document.querySelector('#criteria');
    let startVal = { "country":"","name":"","who_what":"", "activity":"", "sector":0, "keyword":"" }

    let criteria = new JSONEditor(element, {
        use_name_attributes: false,
        theme: 'bootstrap5',
        disable_edit_json: true,
        disable_properties: true,
        // disable_collapse: true,
        iconlib: "bootstrap",
        // remove_button_labels: true,
        startVal: startVal,
        schema: {
            'title': 'Spécifiez vos critères',
            'type': 'object',
            // 'required': [
            //     'country',
            //     'name',
            //     'who_what',
            //     'keyword'
            // ],
            'properties': {
                'country': {
                    'type': 'string',
                    "format": "choices",
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
                    'type': 'integer',
                    "format": "choices",
                    'title': 'Vous recherchez qui/quoi ?',
                    'enum': [0,1,2],
                    'default': 0,
                    'options': {
                        'enum_titles': ['Je ne sais pas', 'Une société', 'Un individu'],
                        'choices': {
                            shouldSort: false,
                            allowHTML: true
                        }
                    }
                },
                'activity': {
                    'type': 'string',
                    'title': 'Activité'
                },
                "sector": {
                  "type": "integer",
                  "title": "Secteur",
                  "format": "choices",
                  "enum": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
                  "default": 0,
                  "options": {
                      "enum_titles": [
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
                      ],
                      'choices': {
                          shouldSort: false,
                          allowHTML: true
                      }
                  }
              },
                'keyword': {
                    'type': 'string',
                    'title': 'Mot clé',
                    'description': 'Mot clé',
                    // 'minLength': 2,
                    // 'default': 'ordinateur'
                }
            }
        }
    });

    const results = document.querySelector('#results')
    const validateCriteria = document.querySelector('#validateCriteria')
    const resetCriteria = document.querySelector('#resetCriteria')
    const filterResults = document.querySelector('#filterResults')

    // Define the custom full-width cell renderer
    function fullWidthCellRenderer(params) {
        return /*html*/`
            <div class="full-width-row">
                <span>${params.data.name}</span>
                <p>${params.data.country}</p>
            </div>`;
    }

    const gridOptions = {
        columnDefs: [
            { headerName: 'Id :', field: 'id', hide: true },
            { headerName: 'Propositions :', field: 'name' },
            { headerName: 'Qui/Quoi', field: 'who_what', hide: true },
            // { headerName: 'Mots Clés', field: 'keyword' },
            // { headerName: 'Num Tél', field: 'phone' }
        ],
        defaultColDef: {sortable: true, filter: true, suppressMovable: true},
        rowSelection: 'multiple',
        pagination: true,
        paginationPageSize: 5,
        rowData: [],
        isFullWidthRow: function (rowNode) {
            // Return true for rows that should be full-width
            return true;
        },
        fullWidthCellRenderer: fullWidthCellRenderer,
        includeHiddenColumnsInQuickFilter: true
    }

    const grid = new Grid(results, gridOptions);

    let showHide = () => {
        const findCriteria = criteria.getValue()

        console.log(findCriteria)

        if(
            findCriteria.country == "" 
            && findCriteria.name == "" 
            && findCriteria.who_what == "" 
            && findCriteria.activity == "" 
            && findCriteria.sector == 0 
            && findCriteria.keyword == "" 
        ) {
            if(!validateCriteria.classList.contains('ion-hide')) {
                validateCriteria.classList.add('ion-hide')
            }        

            if(validateCriteria.getAttribute('disabled') == "false") {
                validateCriteria.setAttribute('disabled', 'true')
            }
        }
        else {
            if(validateCriteria.classList.contains('ion-hide')) {
                validateCriteria.classList.remove('ion-hide')
            }

            if(validateCriteria.getAttribute('disabled') != "false") {
                validateCriteria.setAttribute('disabled', 'false')
            }
        }
    }

    criteria.on('ready', () => {
        const allInputsCriterias = document.querySelectorAll('div[data-schemaid="root"] input')

        // console.log(allInputsCriterias)

        allInputsCriterias.forEach(element => {
        // console.log(element)
        element.addEventListener("focus", (ev) => {
                if(validateCriteria.getAttribute('disabled') != "true") {
                    validateCriteria.setAttribute('disabled', 'true')
                }

                if(!validateCriteria.classList.contains('ion-hide')) {
                    validateCriteria.classList.add('ion-hide')
                }
            })

            element.addEventListener("blur", (ev) => {
                showHide()
            })
        });    
    })

    criteria.on('change', async () => {    
        showHide()
    })

    validateCriteria.addEventListener("click", async (ev) => {
        // gridOptions.api.setRowData(data);

        // ev.target.classList.add('ion-hide')




        const findCriteria = criteria.getValue()
        // document.querySelector('#criteria_value').innerText = JSON.stringify(findCriteria)

        const params = {
            'where': {
                'country': findCriteria.country,
                'name': findCriteria.name,
                'who_what': findCriteria.who_what,
                'activity': findCriteria.activity,
                'sector': findCriteria.sector,
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

        // alert(JSON.stringify(data))

        //Collapse the criteria
        document.querySelector('#criteria h3 button.json-editor-btn-collapse').click()

        //show and enable the reset criteria button
        resetCriteria.classList.remove('ion-hide')
        resetCriteria.setAttribute('disabled', 'false')

        //disable validate criteria button
        validateCriteria.setAttribute('disabled', 'true')
        
        //show the results filtering
        filterResults.classList.remove('ion-hide')

        //show the results
        results.classList.remove('ion-hide')
        gridOptions.api.setRowData(data);
    })

    resetCriteria.addEventListener('click', (ev) => {
        criteria.setValue(startVal)

        if(!validateCriteria.classList.contains('ion-hide')) {
            validateCriteria.classList.add('ion-hide')
        }

        if(!resetCriteria.classList.contains('ion-hide')) {
            resetCriteria.classList.add('ion-hide')
        }

        if(!filterResults.classList.contains('ion-hide')) {
            filterResults.classList.add('ion-hide')
        }

        if(!results.classList.contains('ion-hide')) {
            results.classList.add('ion-hide')
        }

        filterResults.value = ""
        gridOptions.api.setQuickFilter("")
        gridOptions.api.resetQuickFilter()
    })

    document.querySelector('#filterResults').addEventListener("ionInput", (ev) => {
        // console.log(ev.target)
        gridOptions.api.setQuickFilter(ev.target.value)
    })

    leftMenu.logic()

    let args = {}
    args["myFs"] = myFs

    rightMenu.logic(args)
  }
}

  export { mainPage }