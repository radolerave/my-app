let rightMenuTemplate = {
  name: "right-menu-template",
  content: /*html*/`
    <ion-menu content-id="main-content" menu-id="menu2" side="end" swipe-gesture="false">
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
          <ion-item button id="updateLocalDatabase" class="ion-no-padding">     
            <ion-grid class="ion-no-padding ion-padding-bottom ion-padding-top">
              <ion-row class="ion-align-items-center">
                <ion-col size="auto">
                  <ion-icon name="sync-outline"></ion-icon>
                </ion-col>
                <ion-col class="ion-padding-start">
                  <ion-label class="ion-text-wrap">
                    <h2>Télécharger les données à jour</h2>
                    <p>Mise à jour de la base de données de l'application</p>
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
  `,
  logic: async (args) => {
    document.querySelector("#updateLocalDatabase").addEventListener("click", async () => {
        let myFs = args.myFs

        await myFs.populateData()
    })
  }
}

export { rightMenuTemplate }