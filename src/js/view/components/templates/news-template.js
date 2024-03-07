
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { fsConfig } from './../../../config/fsConfig.js'

import { sellerPublicationsManagementTemplate } from './seller-publications-management-template.js'
import { newsTemplate as self } from './news-template.js'

let newsTemplate = {
  name: "news-template",
  content: /*html*/`
    <div id="sellerNewsList" first-load="true">
      ${sellerPublicationsManagementTemplate.content}
    </div>
  `,
  logic: async (args) => {
    const apiUrl = fsConfig.apiUrl
    let myFs = new Fs(FsDb, Dexie)

    let response = await myFs.getPublicationsPublicMode(apiUrl, {}, 3, true)

    response.importTheseTemplates = {
      newsTemplate: self,
    }

    console.log(response)

    sellerPublicationsManagementTemplate.logic(response, "#sellerNewsList")
  }
}

export { newsTemplate }