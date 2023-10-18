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

    async populateData() {
        await this.fsDb.populateData()
    }

    async getData(params) {
        let countrySearchActivated = (params.where.country.length == 0)
        let nameSearchActivated = (params.where.name.length == 0)
        let who_whatSearchActivated = (params.where.who_what == 0)
        let activitySearchActivated = (params.where.activity.length == 0)
        let sectorSearchActivated = (params.where.sector == 0)
        let keywordSearchActivated = (params.where.keyword.length == 0)

        let doNotFilter = countrySearchActivated && nameSearchActivated && who_whatSearchActivated && activitySearchActivated && sectorSearchActivated && keywordSearchActivated 

        const myDb = await this.db
        const collection = myDb.sellersList
        const results = await collection.filter((seller) => {
            if((params['where'] == undefined) || doNotFilter) {
                return false
            }
            else {                
                return ((params.where.country.length > 0 && seller.country.toLowerCase().indexOf(params.where.country.toLowerCase()) > -1 || params.where.country.length == 0)
                    &&
                    ((params.where.name.length > 0 && (seller.name.toLowerCase().indexOf(params.where.name.toLowerCase()) > -1 || seller.tradeName.toLowerCase().indexOf(params.where.name.toLowerCase()) > -1)) || params.where.name.length == 0)
                    && 
                    (params.where.who_what != 0 && seller.who_what == params.where.who_what || params.where.who_what == 0)
                    && 
                    (params.where.activity.length > 0 && seller.activities.some((item) => { return item.activity.toLowerCase().indexOf(params.where.activity.toLowerCase()) > -1 }) || params.where.activity.length == 0)
                    && 
                    (params.where.sector != 0 && seller.sectors.some((item) => { return item.sector == params.where.sector }) || params.where.sector == 0)
                    && 
                    (params.where.keyword.length > 0 && seller.keywords.some((item) => { return item.keyword.toLowerCase().indexOf(params.where.keyword.toLowerCase()) > -1 }) || params.where.keyword.length == 0))
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