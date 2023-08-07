export default class FsDb {
    constructor() {
        
    }

    dbStructure(db, Wrapper) {        
        db.version(1).stores({
			sellerList : `++id, nom, activity, address, phone, email, website, country, state, region, province, city, town, *socialNetworks, category, dateAdd, lastEdit, keywords`
		})

        db.sellerList.add({
            id : 1
        })
        .catch(Wrapper.ConstraintError, () => {
            // Record already exists
        });
    }
}