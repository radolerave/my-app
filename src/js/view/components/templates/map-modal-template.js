import { modalController } from '@ionic/core'

let mapModalTemplate = {
    name: "map-modal-template",
    content: /*html*/`
      <ion-header>
        <ion-toolbar>
          <ion-title>Sur la carte</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding"></ion-content>
    `,
    logic: function (args = {}) {
      let content = this.content

      return {
        openModal: async (params = args) => {
          const div = document.createElement('div');
          div.innerHTML = content
      
          const modal = await modalController.create({
            component: div,
            breakpoints: [0, 0.25, 0.5, 0.75, 1],
            initialBreakpoint: 0.75
          });
      
          modal.present();
      
          const { data, role } = await modal.onWillDismiss();
      
          if (role === 'confirm') {}
        }
      }
    }
  }
  
  export { mapModalTemplate }