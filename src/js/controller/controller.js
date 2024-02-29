export default class Fs {
    constructor(FsDb, Dexie) {
        this.version = "1.0"

        const fsDb = new FsDb(Dexie) 

        this.fsDb = fsDb
        
        this.wrapper = Dexie
        // this.fsDb = fsDb
        this.db = fsDb.db
    }

    getVersion() {
        return this.version
    }

    async getLocalCredentials() {
        const response = await this.fsDb.getLocalCredentials()

        return response
    }

    async testIfLocalCredentialsExist() {
        const response = await this.fsDb.testIfLocalCredentialsExist()

        return response
    }

    async signUp(apiUrl, args, userType) {
        const response = await this.fsDb.signUp(apiUrl, args, userType)

        return response
    }

    async silentSignIn(apiUrl) {
        const response = await this.fsDb.silentSignIn(apiUrl)

        return response
    }

    async signIn(apiUrl, credentials, userType) {
        const response = await this.fsDb.signIn(apiUrl, credentials, userType)

        return response
    }

    async signOut() {
        const response = await this.fsDb.signOut()

        return response
    }

    async accountInfosUpdate(url, args) {
        const response = await this.fsDb.accountInfosUpdate(url, args)

        return response
    }

    async newPublication(apiUrl, data) {
        const response = await this.fsDb.newPublication(apiUrl, data)

        return response
    }

    async getPublications(apiUrl, args, type = null) {
        const response = await this.fsDb.getPublications(apiUrl, args, type)

        return response
    }

    async getPublicationsPublicMode(apiUrl, args, type = null, all = false) {
        const response = await this.fsDb.getPublicationsPublicMode(apiUrl, args, type, all)

        return response
    }

    async updatePublication(apiUrl, data) {
        const response = await this.fsDb.updatePublication(apiUrl, data)

        return response
    }

    async deletePublication(apiUrl, publicationId) {
        const response = await this.fsDb.deletePublication(apiUrl, publicationId)

        return response
    }

    async populateData() {
        const response = await this.fsDb.populateData()

        return response
    }

    async getSellersListLastSyncDate() {
        const response = await this.fsDb.getSellersListLastSyncDate()

        return response
    }

    async getSellerInfos(apiUrl, sellerId) {
        const columns = `activities,contacts,country,keywords,localities,name,sectors,space,credit_tokens,who_what,hourly,calendar,nif,stat,rcs,cin,about,trade_name,date_add,last_edit`

        const response = await this.fsDb.getSellerInfos(apiUrl, sellerId, columns)
        
        return response
    }

    async getLocalSellerInfos(sellerId) {
        const response = await this.fsDb.getLocalSellerInfos(sellerId)
        
        return response
    }

    async updateLocalSellerInfos(data, sellerId) {
        const response = await this.fsDb.updateLocalSellerInfos(data, sellerId)
        
        return response
    }

    async getCreditTokensValue(apiUrl, sellerId) {
        const response = await this.fsDb.getCreditTokensValue(apiUrl, sellerId)
        
        return response
    }

    async getPublicationRate(apiUrl) {
        const response = await this.fsDb.getPublicationRate(apiUrl)
        
        return response
    }

    async getData(params) {//local data
        let countrySearchActivated = (params.where.country.length == 0)
        let searchSearchActivated = (params.where.search.length == 0)
        let who_whatSearchActivated = (params.where.who_what == 0)
        // let activitySearchActivated = (params.where.activity.length == 0)
        let sectorSearchActivated = (params.where.sector == 0)
        // let keywordSearchActivated = (params.where.keyword.length == 0)

        let doNotFilter = countrySearchActivated && searchSearchActivated && who_whatSearchActivated && /*activitySearchActivated && */sectorSearchActivated /*&& keywordSearchActivated */

        const results = await this.fsDb.getData(params, doNotFilter)

        return results
    }
}