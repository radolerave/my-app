import { Grid } from 'ag-grid-community'
import { enums } from "../../../helpers/enums-for-json-editor.js"

let sellerSearchTemplate = {
  name: "seller-search-template",
  content: /*html*/`
    <div id="criteria"></div>

    <ion-button id="bigSearchBtn" class="ion-hide" disabled="true" expand="block">
        <ion-icon name="search" slot="start" size="large"></ion-icon>
        FIND SELLER
    </ion-button>

    <ion-button id="validateCriteria" class="ion-hide" disabled="true">Allons-y !</ion-button>
    <ion-button id="resetCriteria" class="ion-hide" color="danger" disabled="true">Réinitialiser</ion-button>

    <!-- <div id="criteria_value"></div> -->
    
    <ion-searchbar type="text" id="filterResults" placeholder="Plus de précision..." class="ion-hide ion-no-padding"></ion-searchbar>
    <div id="results" style="height: 70vh; width: 100%" class="ag-theme-alpine ion-hide"></div>
  `,
  logic: async (args) => {
    let myFs = args.myFs

    console.log(enums)

    const element = document.querySelector('#criteria');
    let startVal = { "country":"","name":"","who_what":"", "activity":"", "sector":0, "keyword":"" }

    // element.innerHTML = ``

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
                    'enum': enums.countriesList.keys,
                    'default': '',
                    'options': {
                        'enum_titles': enums.countriesList.values,
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
                    'enum': enums.whoWhat.keys,
                    'default': 0,
                    'options': {
                        'enum_titles': enums.whoWhat.values,
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
    const bigSearchBtn = document.querySelector('#bigSearchBtn')
    const resetCriteria = document.querySelector('#resetCriteria')
    const filterResults = document.querySelector('#filterResults')

    results.innerHTML = ``

    // Define the custom full-width cell renderer
    function fullWidthCellRenderer(params) {
        return /*html*/`
            <div class="full-width-row">
                <span>${params.data.name}</span>
                <p>${params.data.country}</p>
                <p>${params.data.last_edit}</p>
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
        rowSelection: 'single',
        pagination: true,
        paginationPageSize: 5,
        rowData: [],
        getRowHeight: (params) => {return 100},//100px
        isFullWidthRow: function (rowNode) {
            // Return true for rows that should be full-width
            return true;
        },
        fullWidthCellRenderer: fullWidthCellRenderer,
        includeHiddenColumnsInQuickFilter: true,
        onRowClicked: (e) => {
          // console.log(e)
          const navigation = fsGlobalVariable.navigation;
        
          navigation.push('seller-details', e)  
        }
    }

    const grid = new Grid(results, gridOptions);

    let showHide = () => {
        const findCriteria = criteria.getValue()

        console.log(findCriteria)

        if(
            findCriteria.country == "" 
            && findCriteria.name == "" 
            && findCriteria.who_what == 0 
            && findCriteria.activity == "" 
            && findCriteria.sector == 0 
            && findCriteria.keyword == "" 
        ) {
            if(!validateCriteria.classList.contains('ion-hide')) {
                validateCriteria.classList.add('ion-hide')
            }        

            if(validateCriteria.getAttribute('disabled') == null) {
                validateCriteria.setAttribute('disabled', 'true')
            }
        }
        else {
            if(validateCriteria.classList.contains('ion-hide')) {
                validateCriteria.classList.remove('ion-hide')
            }

            if(validateCriteria.getAttribute('disabled') != null) {
                validateCriteria.removeAttribute('disabled')
            }
        }
    }

    function findClosestParent(element, selector) {
      while (element) {
        if (element.parentElement && element.parentElement.matches(selector)) {
          // Return the closest parent's parent (the direct parent) that matches the selector
          return element.parentElement;
        }
        // Move up to the parent element
        element = element.parentElement;
      }
      // If no matching parent is found, return null
      return null;
    }

    // Create a new 'change' event
    let changeEvent = new Event('change', {
      bubbles: true, // Allows the event to bubble up the DOM tree
      cancelable: true, // Allows the event to be canceled
    });

    criteria.on('ready', () => {
        const allInputsCriterias = document.querySelectorAll('div[data-schemaid="root"] input')

        // console.log(allInputsCriterias)

        allInputsCriterias.forEach(element => {
            // console.log(element)
            // element.addEventListener("focus", (ev) => {
            //     if(validateCriteria.getAttribute('disabled') != "true") {
            //         validateCriteria.setAttribute('disabled', 'true')
            //     }

            //     if(!validateCriteria.classList.contains('ion-hide')) {
            //         validateCriteria.classList.add('ion-hide')
            //     }
            // })

            // element.addEventListener("blur", (ev) => {
            //     showHide()
            // })

            element.addEventListener("input", (ev) => {                
                // Dispatch the 'change' event on the element
                ev.target.dispatchEvent(changeEvent);
            })
        });    

        document.querySelector('#criteria h3 button.json-editor-btn-collapse').addEventListener('click', (ev) => {        
            if(!bigSearchBtn.classList.contains('ion-hide')) {
                bigSearchBtn.classList.add('ion-hide')
                bigSearchBtn.setAttribute("disabled", "true")
            }
            else {
                bigSearchBtn.classList.remove('ion-hide')
                bigSearchBtn.removeAttribute("disabled")
            }
        })
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
        resetCriteria.removeAttribute('disabled')

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

        document.querySelector('#criteria h3 button.json-editor-btn-collapse').click()

        filterResults.value = ""
        gridOptions.api.setQuickFilter("")
        gridOptions.api.resetQuickFilter()
    })

    bigSearchBtn.addEventListener('click', (ev) => {        
        document.querySelector('#criteria h3 button.json-editor-btn-collapse').click()        
    })    

    document.querySelector('#filterResults').addEventListener("ionInput", (ev) => {
        // console.log(ev.target)
        gridOptions.api.setQuickFilter(ev.target.value)
    })
  }
}

  export { sellerSearchTemplate }