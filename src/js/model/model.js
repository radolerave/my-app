export default class FsDb {
    constructor(Wrapper) {
        const initDexieDb = new Wrapper("FsDb")
        this.wrapper = Wrapper
        this.db = this.dbStructure(initDexieDb, Wrapper)
    }

    dbStructure(initDb, Wrapper) {        
        initDb.version(1).stores({
			sellersList : `&id, *activities, *contacts, country, enabled, *keywords, *localities, name, rank, *sectors, *space, uniqueId, verified, who_what`,
            countriesList : `id, *attributes`
		})        
        
        return initDb
    }    

    async populateData() {
        try {
            let sellersList = await fetch("https://server2.atria.local/findseller/api.php/records/sellers")
            sellersList = await sellersList.json()
            sellersList = sellersList.records

            console.log(sellersList)
            console.log(this.db)

            await this.db.sellersList.clear()//clear previous data

            this.db.sellersList.bulkPut(sellersList)
            .catch(this.wrapper.ConstraintError, () => {
                // Record already exists
                console.log("Record already exists")
            });
        }
        catch(err) {
            console.log(err)
        }
    }
}