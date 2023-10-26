export default class FsDb {
    constructor(Wrapper) {
        const initDexieDb = new Wrapper("FsDb")
        this.wrapper = Wrapper
        this.db = this.dbStructure(initDexieDb, Wrapper)
    }

    dbStructure(initDb, Wrapper) {        
        initDb.version(1).stores({
            session: `&email, password, sellerId, sellerUniqueId, name`,
			sellersList : `&id, *activities, *contacts, country, enabled, *keywords, *localities, name, rank, *sectors, *space, uniqueId, verified, who_what`,
            countriesList : `id, *attributes`
		})        
        
        return initDb
    }    

    async silentSignIn() {        
        try {            
            let localCredentials = await this.db.session.toArray()

            console.log(localCredentials)
            
            let email, password

            if(localCredentials.length == 1) {
                email = localCredentials[0].email
                password = localCredentials[0].password
            }
            else {
                return false
            }

            //proceed to authentication
            let serverSideCredentials = await fetch(`https://server2.atria.local/findseller/api.php/records/accounts?filter=email,eq,${email}&filter=password,eq,${password}`)
            serverSideCredentials = await serverSideCredentials.json()
            serverSideCredentials = serverSideCredentials.records

            console.log(serverSideCredentials)

            let mustBeTrue = () => {
                try {
                    if(serverSideCredentials.length == 1) {//must be 1 because email is unique
                        return (
                            String(serverSideCredentials[0].email) != "undefined"
                            && String(serverSideCredentials[0].password) != "undefined"
                            && String(email) != "undefined"
                            && String(password) != "undefined"
                            && serverSideCredentials[0].email == email
                            && serverSideCredentials[0].password == password
                        )
                    }
                    else {
                        return false
                    }
                }
                catch(err) {
                    return false
                }
            }

            if(mustBeTrue()) {
                this.db.session.put(serverSideCredentials[0])
                return true
            }
            else {
                return false
            }
        }
        catch(err) {
            console.log(err)

            return false
        }
    }

    async signIn(credentials) {
        try {            
            let email = credentials.email
            let password = credentials.password

            //proceed to authentication
            let serverSideCredentials = await fetch(`https://server2.atria.local/findseller/api.php/records/accounts?filter=email,eq,${email}&filter=password,eq,${password}`)
            serverSideCredentials = await serverSideCredentials.json()
            serverSideCredentials = serverSideCredentials.records

            console.log(serverSideCredentials)

            let mustBeTrue = () => {
                try {
                    if(serverSideCredentials.length == 1) {//must be 1 because email is unique
                        return (
                            String(serverSideCredentials[0].email) != "undefined"
                            && String(serverSideCredentials[0].password) != "undefined"
                            && String(email) != "undefined"
                            && String(password) != "undefined"
                            && serverSideCredentials[0].email == email
                            && serverSideCredentials[0].password == password
                        )
                    }
                    else {
                        return false
                    }
                }
                catch(err) {
                    return false
                }
            }

            if(mustBeTrue()) {
                this.db.session.put(serverSideCredentials[0])
                return true
            }
            else {
                return false
            }
        }
        catch(err) {
            console.log(err)

            return false
        }
    }

    async signOut() {
        try {
            await this.db.session.clear()//clear local session data

            return true
        }
        catch(err) {                    
            console.log(err)

            return false
        }
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