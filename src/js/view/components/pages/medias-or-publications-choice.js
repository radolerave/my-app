let mediasOrPublicationsChoice = {
  name: "medias-or-publications-choice",
  content: /*html*/`
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
          </ion-buttons>

          <ion-title>Que voulez-vous faire ?</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>        
        <div id="medias-or-publications-choice-content">
          <div>            
            <ion-button id="mediasManagementBtn" expand="block">Gestion des médias</ion-button>
            <ion-text>-</ion-text>
            <ion-button id="publicationsManagementBtn" expand="block">Gestion des publications</ion-button>       
          </div>
        </div>         
    </ion-content>

    <style>
      #medias-or-publications-choice-content {
        text-align: center;
        /* border: solid red 1px; */
        display: flex;
        justify-content: center;
        align-items: center;
        /* width: 100%; */
        height: 100%;
      }
    </style>
  `,
  logic: async () => {
    const navigation = document.querySelector("ion-app ion-nav#navigation")

    const mediasManagementBtn = document.querySelector("#mediasManagementBtn")
    const publicationsManagementBtn = document.querySelector("#publicationsManagementBtn")    

    mediasManagementBtn.addEventListener("click", async () => {
      fsGlobalVariable.textToPublish = [{ insert: '\n' }]
      await navigation.push("seller-medias-management")
    })

    publicationsManagementBtn.addEventListener("click", async () => {
      fsGlobalVariable.textToPublish = [{ insert: '\n' }]
      await navigation.push("seller-publications-management")
    })
  }
}

  export { mediasOrPublicationsChoice }