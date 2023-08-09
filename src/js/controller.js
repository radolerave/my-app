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
        let data

        // if(params['where'] != undefined) {
        //     data = await this.db.sellerList.where(params['where']).toArray()
        // }
        // else {
        //     data = await this.db.sellerList.toArray()
        // }

        // return data

        let countrySearchActivated = false
        let nameSearchActivated = false
        let who_whatSearchActivated = false
        let keywordsSearchActivated = false

        let searchConditions = true

        

        return await this.db.sellerList.filter((d) => {
            if(params['where'] != undefined) {
                searchConditions = (params.where.country.toLowerCase() != 'XXX'.toLowerCase() && d.country.toLowerCase().indexOf(params.where.country.toLowerCase()) > -1 || params.where.country.toLowerCase() == 'XXX'.toLowerCase())
                    &&
                    (params.where.name.length > 0 && d.name.length > 0 && d.name.toLowerCase().indexOf(params.where.name.toLowerCase()) > -1 || params.where.name.length == 0)
                    && 
                    (parseInt(params.where.who_what) != 0 && parseInt(d.who_what) == parseInt(params.where.who_what) || parseInt(params.where.who_what) == 0)
                    && 
                    (params.where.keywords.length > 0 && d.keywords.length > 0 && d.keywords.toLowerCase().indexOf(params.where.keywords.toLowerCase()) > -1 || params.where.keywords.length == 0)
                
                return searchConditions
            }
            else {alert("xou")
                return false
            }            
        }).toArray()
    }
}