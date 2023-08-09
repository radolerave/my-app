export default class FsDb {
    constructor(Wrapper) {
        const initDexieDb = new Wrapper("FsDb")
        this.db = this.dbStructure(initDexieDb, Wrapper)
    }

    dbStructure(db, Wrapper) {        
        db.version(1).stores({
			sellerList : `++id, name, who_what, activity, address, phone, email, website, country, state, region, province, city, town, *socialNetworks, mapAddress, category, dateAdd, lastEdit, keywords`
		})

        db.sellerList.bulkPut([
            { id: 1, name: 'Piments de Mada', who_what: 1, keywords: "sakay", country: 'MG', phone: '+261332943724' },
            { id: 2, name: 'Bricadeki', who_what: 2, keywords: "bricollage", country: 'ESP', phone: '+261785433535' },
            { id: 3, name: 'DOLTO', who_what: 1, keywords: "quincaillerie", country: 'MG', phone: '+261332424245' },
            { id: 4, name: 'ELFO', who_what: 0, keywords: "menuiserie", country: 'ESP', phone: '+26100442554' },
            { id: 5, name: 'SIMU', who_what: 2, keywords: "immo", country: 'FR', phone: '+26124452055' }
        ])
        .catch(Wrapper.ConstraintError, () => {
            // Record already exists
        });

        return db
    }    
}