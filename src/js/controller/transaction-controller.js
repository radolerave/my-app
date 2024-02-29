import Fs from './controller.js'

export default class FsTransaction extends Fs {
    constructor(FsDb, Dexie) {
        super(FsDb, Dexie)
    }

    async newTransaction(apiUrl, data) {
        const response = await this.fsDb.newTransaction(apiUrl, data)

        return response
    }

    // async getTransactions(apiUrl, args, type = null) {
    //     const response = await this.fsDb.getTransactions(apiUrl, args, type)

    //     return response
    // }

    // async getTransactionsPublicMode(apiUrl, args, type = null, all = false) {
    //     const response = await this.fsDb.getTransactionsPublicMode(apiUrl, args, type, all)

    //     return response
    // }

    async updateTransaction(apiUrl, data) {
        const response = await this.fsDb.updateTransaction(apiUrl, data)

        return response
    }
}