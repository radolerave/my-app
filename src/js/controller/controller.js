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
        // let countrySearchActivated = (params.where.country.length == 0)
        let nameSearchActivated = (params.where.name.length == 0)
        // let who_whatSearchActivated = (params.where.who_what.length == 0)
        // let activitySearchActivated = (params.where.activity.length == 0)
        // let keywordsSearchActivated = (params.where.keywords.length == 0)

        let doNotFilter = /*countrySearchActivated && */nameSearchActivated/* && who_whatSearchActivated && activitySearchActivated && keywordsSearchActivated  */  

        const myDb = await this.db
        const collection = myDb.sellersList
        const results = await collection.filter((seller) => {
            if((params['where'] == undefined) || doNotFilter) {
                return false
            }
            else {                
                return (/*params.where.country.length > 0 && seller.country.toLowerCase().indexOf(params.where.country.toLowerCase()) > -1 || params.where.country.length == 0)
                    &&*/
                    (params.where.name.length > 0 && seller.name.toLowerCase().indexOf(params.where.name.toLowerCase()) > -1 || params.where.name.length == 0)
                    /*&& 
                    (params.where.who_what.length > 0 && seller.who_what.toLowerCase() == params.where.who_what.toLowerCase() || params.where.who_what.length == 0)
                    && 
                    (params.where.activity.length > 0 && seller.activity.toLowerCase().indexOf(params.where.activity.toLowerCase()) > -1 || params.where.activity.length == 0)
                    && 
                    (params.where.keywords.length > 0 && seller.keywords.toLowerCase().indexOf(params.where.keywords.toLowerCase()) > -1 || params.where.keywords.length == 0*/)
            }         
        }).toArray()

        // return results.map((record) => {
        //     return { 
        //         id: record.id,
        //         name: record.attributes.name 
        //     }
        // });

        return results
    }
}