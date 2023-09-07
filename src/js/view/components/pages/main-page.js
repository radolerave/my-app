// import { JSONEditor } from '@json-editor/json-editor'
import { Grid } from 'ag-grid-community';
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'

let mainPage = {
  name: "main-page",
  content: /*html*/`
    <ion-menu content-id="main-content" menu-id="menu">
      <ion-header>
        <ion-toolbar>
          <ion-title class="ion-no-padding">
            <ion-grid>
              <ion-row class="ion-align-items-center">
                <ion-col size="auto">
                  <!-- <img class="svg" id="logoBdc" alt="Logo BDC" src="./assets/imgs/logo.svg" width="25" height="25" /> -->
                </ion-col>
                <ion-col>
                  Find Seller
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item-group>
            <ion-item-divider class="ion-no-padding">
              <ion-label>
                <ion-icon name="construct-outline"></ion-icon> Réglages
              </ion-label>
            </ion-item-divider>

            <ion-item button id="settings" detail="true" class="ion-no-padding">
              <ion-grid class="ion-no-padding ion-padding-bottom ion-padding-top">
                <ion-row class="ion-align-items-center">
                  <ion-col size="auto">
                    <ion-icon name="settings-outline"></ion-icon>
                  </ion-col>
                  <ion-col class="ion-padding-start">
                    <ion-label>Paramètres globaux</ion-label>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>

            <ion-item button id="preferences" detail="true" class="ion-no-padding">
              <ion-grid class="ion-no-padding ion-padding-bottom ion-padding-top">
                <ion-row class="ion-align-items-center">
                  <ion-col size="auto">
                    <ion-icon name="color-wand-outline"></ion-icon>
                  </ion-col>
                  <ion-col class="ion-padding-start">
                    <ion-label>Préférences</ion-label>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>    

            <ion-nav-link router-direction="forward" component="my-account">
              <ion-item button id="myAccount" class="ion-no-padding">
                <ion-grid class="ion-no-padding ion-padding-bottom ion-padding-top">
                  <ion-row class="ion-align-items-center">
                    <ion-col size="auto">
                      <ion-icon name="people-circle-outline"></ion-icon>
                    </ion-col>
                    <ion-col class="ion-padding-start">
                      <ion-label class="ion-text-wrap">Mon compte</ion-label>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-item>  
            </ion-nav-link>        
          </ion-item-group>
          <!-- <hr> -->
        </ion-list>
      </ion-content>

      <ion-footer>
        <ion-toolbar>
          <ion-text id="app-version" class="ion-padding" color="medium"></ion-text>
        </ion-toolbar>
      </ion-footer>
    </ion-menu>

    <ion-menu content-id="main-content" menu-id="menu2" side="end">
      <ion-header>
        <ion-toolbar>
          <ion-title>Plus d'options</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-text class="ion-float-right" color="medium">
          <sup id="lastSync"></sup>
        </ion-text>
        <br>
        <ion-list>
          <ion-item button id="syncBidirectional" class="ion-no-padding">     
            <ion-grid class="ion-no-padding ion-padding-bottom ion-padding-top">
              <ion-row class="ion-align-items-center">
                <ion-col size="auto">
                  <ion-icon name="sync-outline"></ion-icon>
                </ion-col>
                <ion-col class="ion-padding-start">
                  <ion-label class="ion-text-wrap">
                    <h2>Synchroniser</h2>
                    <p>Synchronisez vos BDCs sur tous vos appareils</p>
                  </ion-label>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
          <ion-progress-bar id="syncProgressBidirectional"></ion-progress-bar>
        </ion-list>          
        
        <ion-item-divider></ion-item-divider>

        <ion-item button id="exitApp" class="ion-margin-top ion-padding ion-hide">
          <ion-grid class="ion-no-padding ion-padding-bottom ion-padding-top">
            <ion-row class="ion-align-items-center">
              <ion-col size="auto">
                <ion-icon name="power" color="danger"></ion-icon>
              </ion-col>
              <ion-col class="ion-padding-start">
                <ion-label color="danger" class="ion-text-wrap">
                  <h2>Quitter l'application</h2>
                  <!-- <p>Sur Android Seulement</p> -->
                </ion-label>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="ion-text-right">
          <ion-button id="help" fill="clear" color="primary"><ion-icon name="help-circle-outline"></ion-icon>&nbsp;<ion-text>Aide</ion-text></ion-button>
        </ion-toolbar>
      </ion-footer>
    </ion-menu>

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
    let startVal = { "country":"","name":"","who_what":"", "activity":"","keywords":"" }

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
            //     'keywords'
            // ],
            'properties': {
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
                'activity': {
                    'type': 'string',
                    'title': 'Activité'
                },
                'keywords': {
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
                <p>${params.data.who_what}</p>
            </div>`;
    }

    const gridOptions = {
        columnDefs: [
            { headerName: 'Id :', field: 'id', hide: true },
            { headerName: 'Propositions :', field: 'name' },
            { headerName: 'Qui/Quoi', field: 'who_what', hide: true },
            // { headerName: 'Mots Clés', field: 'keywords' },
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
            && findCriteria.keywords == "" 
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
                'keywords': findCriteria.keywords
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
  }
}

  export { mainPage }