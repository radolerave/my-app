export default class FsDb {
    constructor() {
        
    }

    dbStructure(db, Wrapper) {        
        db.version(1).stores({
			sellerList : `++id, name, who_what, activity, address, phone, email, website, country, state, region, province, city, town, *socialNetworks, mapAddress, category, dateAdd, lastEdit, keyword`
		})

        db.sellerList.bulkPut([
            { id: 1, name: 'Piment de Mada', phone: '+261332943724' },
            { id: 2, name: 'Bricadeki', phone: '+261785433535' },
            { id: 3, name: 'DOLTO', phone: '+261332424245' },
            { id: 4, name: 'ELFO', phone: '+26100442554' },
            { id: 5, name: 'SIMU', phone: '+26124452055' }
        ])
        .catch(Wrapper.ConstraintError, () => {
            // Record already exists
        });
    }
}