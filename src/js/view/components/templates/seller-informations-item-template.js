let sellerInformationsItemTemplate = {
  name: "seller-informations-item-template",
  content: /*html*/``,
  logic: (args = {}) => {
    const iconAriaHidden = typeof args.iconAriaHidden != "undefined" ? args.iconAriaHidden : "true"
    const iconName = typeof args.iconName != "undefined" ? args.iconName : ""
    const iconSlot = typeof args.iconSlot != "undefined" ? args.iconSlot : "start"
    const iconSize = typeof args.iconSize != "undefined" ? args.iconSize : "medium"
    const noTitle = typeof args.noTitle != "undefined" && args.noTitle == true ? true : false
    const title = typeof args.title != "undefined" && noTitle == false ? `<h2>${args.title}</h2>` : ""
    const property = typeof args.property != "undefined" ? args.property : ""
    const propertyValue = typeof args.propertyValue != "undefined" ? args.propertyValue : ""

    const icon = typeof iconName == "string" && iconName.length > 0 ? `<ion-icon class="ion-no-padding ion-margin-end" aria-hidden=${iconAriaHidden} name=${iconName} slot=${iconSlot} size=${iconSize}></ion-icon>` : ""
    const button = typeof args.button != "undefined" && args.button == true ? `button="true"` : `button="false"`
    const parentItemId = typeof args.parentItemId != "undefined" && /^[\w-_]{1,}$/.test(args.parentItemId) ? `id="${args.parentItemId}"` : ""



    return /*html*/`
      <ion-item class="ion-no-padding" ${button} ${parentItemId}>
        ${icon}
        <ion-label>
          ${title}
          <p id=${property}>${propertyValue}</p>
        </ion-label>
      </ion-item>
    `
  }
}

export { sellerInformationsItemTemplate }