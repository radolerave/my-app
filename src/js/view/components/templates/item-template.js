let itemTemplate = {
    name: "item-template",
    content: /*html*/``,
    logic: (args = {}) => {
      const iconAriaHidden = typeof args.iconAriaHidden != "undefined" ? args.iconAriaHidden : "true"
      const iconName = typeof args.iconName != "undefined" ? args.iconName : ""
      const iconSlot = typeof args.iconSlot != "undefined" ? args.iconSlot : "start"
      const iconSize = typeof args.iconSize != "undefined" ? args.iconSize : "medium"
      const noTitle = typeof args.noTitle == "boolean" && args.noTitle == true ? true : false
      const title = typeof args.title != "undefined" && noTitle == false ? `<h2>${args.title}</h2>` : ""
      const value = typeof args.value != "undefined" ? args.value : ""     
      const isButton = typeof args.isButton == "boolean" && args.isButton == true ? true : false 

        function func () { 
            return args.onClick
        }

      const onClick = typeof func == "function" ? "onclick='func()'" : "onclick=''"
  
      const icon = typeof iconName == "string" && iconName.length > 0 ? `<ion-icon class="ion-no-padding ion-margin-end" aria-hidden=${iconAriaHidden} name=${iconName} slot=${iconSlot} size=${iconSize}></ion-icon>` : ""
  
  
  
      return /*html*/`
        <ion-item ${isButton ? "button='true'" : ""} class="ion-no-padding" ${onClick}>
          ${icon}
          <ion-label>
            ${title}
            <p>${value}</p>
          </ion-label>
        </ion-item>
      `
    }
  }
  
  export { itemTemplate }