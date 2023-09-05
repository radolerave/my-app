export default class FsDb {
    constructor(Wrapper) {
        const initDexieDb = new Wrapper("FsDb")
        this.db = this.dbStructure(initDexieDb, Wrapper)
    }

    async dbStructure(db, Wrapper) {        
        db.version(1).stores({
			sellersList : `++id, *activities, *contacts, country, enabled, *keywords, *localities, name, rank, *sectors, *space, uniqueId, verified, who_what`,
            countriesList : `id, *attributes`
		})

        try {
            let sellersList = await fetch("https://server2.atria.local/findseller/api.php/records/sellers")
            sellersList = await sellersList.json()
            sellersList = sellersList.records

            console.log(sellersList)

            db.sellersList.bulkPut(sellersList)
            .catch(Wrapper.ConstraintError, () => {
                // Record already exists
            });
        }
        catch(err) {
            console.log(err)
        }

        // let countriesList = await fetch("http://localhost:1337/api/country")
        // countriesList = await countriesList.json()
        // countriesList = countriesList.data

        // console.log(countriesList)

        // db.countriesList.put(countriesList)
        // .catch(Wrapper.ConstraintError, () => {
        //     // Record already exists
        // });

        return db
    }    
}