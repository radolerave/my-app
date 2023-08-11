export default class Fs {
    constructor(FsDb, Dexie) {
        this.version = "1.0"

        const fsDb = new FsDb(Dexie) 
        
        this.wrapper = Dexie
        // this.fsDb = fsDb
        this.db = fsDb.db
    }

    getVersion() {
        return this.version
    }

    async getData(params) {
        let countrySearchActivated = (params.where.country.length == 0)
        let nameSearchActivated = (params.where.name.length == 0)
        let who_whatSearchActivated = (params.where.who_what.length == 0)
        let keywordSearchActivated = (params.where.keyword.length == 0)

        let doNotFilter = countrySearchActivated && nameSearchActivated && who_whatSearchActivated && keywordSearchActivated    

        return await this.db.sellerList.filter((d) => {
            if((params['where'] == undefined) || doNotFilter) {
                return false
            }
            else {                
                return (params.where.country.length > 0 && d.country.toLowerCase().indexOf(params.where.country.toLowerCase()) > -1 || params.where.country.length == 0)
                    &&
                    (params.where.name.length > 0 && d.name.toLowerCase().indexOf(params.where.name.toLowerCase()) > -1 || params.where.name.length == 0)
                    && 
                    (params.where.who_what.length > 0 && d.who_what.toLowerCase() == params.where.who_what.toLowerCase() || params.where.who_what.length == 0)
                    && 
                    (params.where.keyword.length > 0 && d.keyword.toLowerCase().indexOf(params.where.keyword.toLowerCase()) > -1 || params.where.keyword.length == 0)
            }         
        }).toArray()
    }
}