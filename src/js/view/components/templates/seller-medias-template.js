import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { fsConfig } from './../../../config/fsConfig.js'

import { sellerPublicationsManagementTemplate } from './../templates/seller-publications-management-template.js'

let sellerMediasTemplate = {
  name: "seller-medias-template",
  content: /*html*/`
    <div id="sellerPublicationsList" first-load="true">
      ${sellerPublicationsManagementTemplate.content}
    </div>
  `,
  logic: async (args) => {
    const data = args
    const apiUrl = fsConfig.apiUrl
    let myFs = new Fs(FsDb, Dexie)

    console.log(data)

    let response = await myFs.getPublicationsPublicMode(apiUrl, {
      sellerId : data.id
    })

    console.log(response)

    sellerPublicationsManagementTemplate.logic(response, "#sellerPublicationsList", data.name)
  }
}

export { sellerMediasTemplate }