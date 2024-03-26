
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { fsConfig } from './../../../config/fsConfig.js'

import { sellerPublicationsManagementTemplate } from './seller-publications-management-template.js'
import { advertisementsTemplate as self } from './advertisements-template.js'

let advertisementsTemplate = {
  name: "advertisements-template",
  content: /*html*/`
    <div id="sellerAdvertisementsList" first-load="true">
      ${sellerPublicationsManagementTemplate.content}
    </div>
  `,
  logic: async (args) => {
    const apiUrl = fsConfig.apiUrl
    let myFs = new Fs(FsDb, Dexie)

    let response = await myFs.getPublicationsPublicMode(apiUrl, {}, 2, true)

    response.importTheseTemplates = {
      advertisementsTemplate: self,
    }

    console.log(response)

    await sellerPublicationsManagementTemplate.logic(response, "#sellerAdvertisementsList")
  }
}

export { advertisementsTemplate }