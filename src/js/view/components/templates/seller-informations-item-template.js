let sellerInformationsItemTemplate = {
  name: "seller-informations-item-template",
  content: /*html*/``,
  logic: (args = {}) => {
    const ariaHidden = typeof args.ariaHidden != "undefined" ? args.ariaHidden : "true"
    const name = typeof args.name != "undefined" ? args.name : "information-circle-outline"
    const slot = typeof args.slot != "undefined" ? args.slot : "start"
    const size = typeof args.size != "undefined" ? args.size : "large"
    const title = typeof args.title != "undefined" ? args.title : ""
    const property = typeof args.property != "undefined" ? args.property : ""

    return /*html*/`
      <ion-item>
        <ion-icon aria-hidden=${ariaHidden} name=${name} slot=${slot} size=${size}></ion-icon>
        <ion-label>
          <h2>${title}</h2>
          <p id=${property}></p>
        </ion-label>
      </ion-item>
    `
  }
}

export { sellerInformationsItemTemplate }