let leftMenuTemplate = {
    name: "left-menu-template",
    content: /*html*/`
        <ion-menu content-id="main-content" menu-id="menu" swipe-gesture="false">
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

                    <ion-nav-link router-direction="forward" component="seller-settings">
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
                    </ion-nav-link> 

                    <ion-nav-link router-direction="forward" component="seller-preferences">
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
    `,
    logic: () => {

    }
}

export { leftMenuTemplate }