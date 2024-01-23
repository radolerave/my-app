export default class FsDb {
    constructor(Wrapper) {
        const initDexieDb = new Wrapper("FsDb")
        this.wrapper = Wrapper
        this.db = this.dbStructure(initDexieDb, Wrapper)
    }

    dbStructure(initDb, Wrapper) {        
        initDb.version(1).stores({
            session: `&email, password, seller_id, name, userType`,
			sellersList : `&id, *activities, *contacts, country, enabled, *keywords, *localities, name, rank, *sectors, *space, verified, who_what`,
            sellersListLastSyncDate : `id, date`,
            countriesList : `id, *attributes`
		})        
        
        return initDb
    }  
    
    async testIfLocalCredentialsExist() {//signIn mode : device <=> localDb
        //if it returns true, it is supposed that the user has signed in
        try {
            let localCredentials = await this.db.session.toArray()

            // console.log(localCredentials)
            
            let email, password

            if(localCredentials.length == 1) {/*This is to limit the frequency of the testSignedIn request from the client to the server - do it locally; never use this method if neither (connection mode: localDb <=> server database) nor (connection mode: user input <=> server database) have been called before*/
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

    async getLocalCredentials() {//device <=> localDb
        let localCredentials = undefined
        try {
            const resp = await this.db.session.toArray()
            localCredentials = resp[0]

            // console.log(localCredentials)                                 
        }
        catch(err) {
            console.log(err)
        }

        return localCredentials
    }

    async signUp(apiUrl, args, userType) {
        let ret = {}
        let dateOperation = null

        try {
            // Construct the API endpoint URL for creating the item
            const urlAccounts = `${apiUrl}/accounts`;
            let dataAccounts = args.data

            const urlSellers = `${apiUrl}/sellers`;
            let dataSellers = {}

            // console.log(dataAccounts)

            let createSellerOperation = await fetch(urlSellers, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary authentication headers here
                },
                body: JSON.stringify(dataSellers),
            })

            let createdSeller = await createSellerOperation.json()

            if(typeof createdSeller == "number") {
                dataAccounts.seller_id = createdSeller

                // Send a POST request to create the item
                let signUpOperation = await fetch(urlAccounts, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any necessary authentication headers here
                    },
                    body: JSON.stringify(dataAccounts),
                })

                dateOperation = new Date(signUpOperation.headers.get("date"))

                let createdItem = await signUpOperation.json()

                if(typeof createdItem == "number") {
                    console.log('Created item:', createdItem);

                    ret = {
                        ok: true,
                        date: dateOperation,
                        pk : createdItem
                    }
                }
                else {
                    ret = {
                        ok: false,
                        date: dateOperation,
                        pk: null,
                        errorCode: createdItem.code,
                        errorText: createdItem.message
                    }
                }
            }
            else {
                ret = {
                    ok: false,
                    date: dateOperation,
                    pk: null,
                    errorCode: createdSeller.code,
                    errorText: createdSeller.message
                }
            }
        }
        catch(error) {
            console.error('Error updating item:', error);
            // Handle error

            ret = {
                ok: false,
                date: null,
                pk : null,
                errorText: "Vérifiez votre connexion au serveur. Assurez vous d'être connecté(e) à Internet."
            }
        }

        return ret
    }

    async silentSignIn(apiUrl) {//signIn mode : localDb <=> server db
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
            let serverSideCredentials = await fetch(`${apiUrl}/accounts?filter=email,eq,${email}&filter=password,eq,${password}`)
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

            // if(mustBeTrue()) {
            //     this.db.session.put(serverSideCredentials[0])
            //     return true
            // }
            // else {
            //     return false
            // }

            return mustBeTrue()
        }
        catch(err) {
            console.log(err)

            return false
        }
    }

    async signIn(apiUrl, credentials, userType) {//signIn mode : user input <=> server db
        try {            
            let email = credentials.email
            let password = credentials.password

            //proceed to authentication
            let serverSideCredentials = await fetch(`${apiUrl}/accounts?filter=email,eq,${email}&filter=password,eq,${password}`)
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
                let session = serverSideCredentials[0]
                session.userType = userType
                
                await this.db.session.put(session)
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

    async accountInfosUpdate(url, args) {
        let ret = {}
        let lastEdit = null

        try {
            if(await this.silentSignIn(url)) {//credentials must be verified to be able to update anything
                // Construct the API endpoint URL for updating the item
                const updateUrl = `${url}/sellers/${args.credentials.sellerId}`;
                const updatedData = args.updatedData

                //do a verification process before continuing*********** (credentials)

                // Send a PUT request to update the item
                let updateOperation = await fetch(updateUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any necessary authentication headers here
                    },
                    body: JSON.stringify(updatedData),
                })

                lastEdit = new Date(updateOperation.headers.get("date"))

                let updatedItem = await updateOperation.json()

                console.log('Updated item:', updatedItem);

                ret = {
                    ok: true,
                    date: lastEdit,
                    nbrOfRows : updatedItem
                }
            }
            else {
                ret = {
                    ok: false,
                    date: null,
                    nbrOfRows: 0,
                    errorText: "Vos informations d'identification ne correspondent pas, veuillez vous reconnecter."
                }
            }
        }
        catch(error) {
            console.error('Error updating item:', error);
            // Handle error

            ret = {
                ok: false,
                date: null,
                nbrOfRows : 0,
                errorText: "Vérifiez votre connexion au serveur. Assurez vous d'être connecté(e) à Internet."
            }
        }

        return ret
    }

    async newPublication(url, args) {
        let ret = {}
        let dateOperation = null

        try {
            if(await this.silentSignIn(url)) {//credentials must be verified to be able to update anything
                // Construct the API endpoint URL for creating the item
                const updateUrl = `${url}/publications`;
                const updatedData = args.updatedData

                //do a verification process before continuing*********** (credentials)

                // Send a POST request to create the item
                let createNewPublicationOperation = await fetch(updateUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any necessary authentication headers here
                    },
                    body: JSON.stringify(updatedData),
                })

                dateOperation = new Date(createNewPublicationOperation.headers.get("date"))

                let createdItem = await createNewPublicationOperation.json()

                console.log('Created item:', createdItem);

                ret = {
                    ok: true,
                    date: dateOperation,
                    pk : createdItem
                }
            }
            else {
                ret = {
                    ok: false,
                    date: null,
                    pk: null,
                    errorText: "Vos informations d'identification ne correspondent pas, veuillez vous reconnecter."
                }
            }
        }
        catch(error) {
            console.error('Error updating item:', error);
            // Handle error

            ret = {
                ok: false,
                date: null,
                pk : null,
                errorText: "Vérifiez votre connexion au serveur. Assurez vous d'être connecté(e) à Internet."
            }
        }

        return ret
    }

    async getPublications(url, args) {
        let ret = {}
        let dateOperation = null

        try {
            if(await this.silentSignIn(url)) {//credentials must be verified
                const sellerId = args.sellerId

                let publicationsList = await fetch(`${url}/publications?filter=seller_id,eq,${sellerId}&order=last_edit,desc`)

                dateOperation = new Date(publicationsList.headers.get("date"))

                publicationsList = await publicationsList.json()
                publicationsList = publicationsList.records
                
                ret = {
                    ok: true,
                    date: dateOperation,
                    records : publicationsList
                }
            }
            else {
                ret = {
                    ok: false,
                    date: null,
                    records: [],
                    errorCode: 1,
                    errorText: "Vos informations d'identification ne correspondent pas, veuillez vous reconnecter."
                }
            }
        }
        catch(error) {
            console.error('Error updating item:', error);
            // Handle error

            ret = {
                ok: false,
                date: null,
                records : [],
                errorCode: 0,
                errorText: "Vérifiez votre connexion au serveur. Assurez vous d'être connecté(e) à Internet."
            }
        }

        return ret
    }

    async getPublicationsPublicMode(url, args) {
        let ret = {}
        let dateOperation = null

        try {
            const sellerId = args.sellerId

            let publicationsList = await fetch(`${url}/publications?filter=seller_id,eq,${sellerId}&filter=enabled,eq,1&order=last_edit,desc`)

            dateOperation = new Date(publicationsList.headers.get("date"))

            publicationsList = await publicationsList.json()
            publicationsList = publicationsList.records
            
            ret = {
                ok: true,
                date: dateOperation,
                records : publicationsList,
                noControls : true
            }
        }
        catch(error) {
            console.error('Error updating item:', error);
            // Handle error

            ret = {
                ok: false,
                date: null,
                records : [],
                noControls : true,
                errorCode: 0,
                errorText: "Vérifiez votre connexion au serveur. Assurez vous d'être connecté(e) à Internet."
            }
        }

        return ret
    }

    async updatePublication(url, args) {
        let ret = {}
        let dateOperation = null

        try {
            if(await this.silentSignIn(url)) {//credentials must be verified to be able to update anything
                // Construct the API endpoint URL for updating the item
                const updateUrl = `${url}/publications/${args.publicationId}`;
                const updatedData = args.updatedData

                //do a verification process before continuing*********** (credentials)

                // Send a PUT request to update the item
                let updatePublicationOperation = await fetch(updateUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any necessary authentication headers here
                    },
                    body: JSON.stringify(updatedData),
                })

                dateOperation = new Date(updatePublicationOperation.headers.get("date"))

                let updatedItem = await updatePublicationOperation.json()

                console.log('Updated item:', updatedItem);

                ret = {
                    ok: true,
                    date: dateOperation,
                    nbrOfRows : updatedItem
                }
            }
            else {
                ret = {
                    ok: false,
                    date: null,
                    nbrOfRows: 0,
                    errorText: "Vos informations d'identification ne correspondent pas, veuillez vous reconnecter."
                }
            }
        }
        catch(error) {
            console.error('Error updating item:', error);
            // Handle error

            ret = {
                ok: false,
                date: null,
                nbrOfRows : 0,
                errorText: "Vérifiez votre connexion au serveur. Assurez vous d'être connecté(e) à Internet."
            }
        }

        return ret
    }

    async deletePublication(url, publicationId) {
        let ret = {}
        let dateOperation = null

        try {
            if(await this.silentSignIn(url)) {//credentials must be verified to be able to update anything
                // Construct the API endpoint URL for updating the item
                const updateUrl = `${url}/publications/${publicationId}`;

                //do a verification process before continuing*********** (credentials)

                // Send a DELETE request to delete the item
                let updatePublicationOperation = await fetch(updateUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any necessary authentication headers here
                    },
                    // body: JSON.stringify(updatedData),
                })

                dateOperation = new Date(updatePublicationOperation.headers.get("date"))

                let deletedItem = await updatePublicationOperation.json()

                console.log('Updated item:', deletedItem);

                ret = {
                    ok: true,
                    date: dateOperation,
                    nbrOfDeletedRows : deletedItem
                }
            }
            else {
                ret = {
                    ok: false,
                    date: null,
                    nbrOfDeletedRows: 0,
                    errorText: "Vos informations d'identification ne correspondent pas, veuillez vous reconnecter."
                }
            }
        }
        catch(error) {
            console.error('Error updating item:', error);
            // Handle error

            ret = {
                ok: false,
                date: null,
                nbrOfDeletedRows : 0,
                errorText: "Vérifiez votre connexion au serveur. Assurez vous d'être connecté(e) à Internet."
            }
        }

        return ret
    }

    async populateData() {
        let ret = {}
        let lastSync 

        try {
            let sellersList = await fetch("https://server2.atria.local/findseller/api.php/records/sellers")

            lastSync = new Date(sellersList.headers.get("date"))
            
            sellersList = await sellersList.json()
            sellersList = sellersList.records

            console.log(sellersList)
            console.log(this.db)

            await this.db.sellersList.clear()//clear previous data

            const arrayOfPks = await this.db.sellersList.bulkPut(sellersList, {allKeys: true})
            .catch(this.wrapper.ConstraintError, () => {
                // Record already exists
                console.log("Record already exists")
            });

            await this.db.sellersListLastSyncDate.put({"id": 1, "date": lastSync})//normally always the first data

            ret.ok = true
            ret.date = lastSync
            ret.arrayOfPks = arrayOfPks
            // console.log(arrayOfPks)
        }
        catch(err) {
            console.log(err)

            ret.ok = false
            ret.date = undefined
            ret.arrayOfPks = []
            ret.error = err
        }

        return ret
    }

    async getSellersListLastSyncDate() {
        let date = undefined

        try {
            let result = await this.db.sellersListLastSyncDate.toArray()
            result = result[0]//normally always the first data
            date = result.date
        }
        catch(err) {
            console.log(err)
        }

        return date
    }

    async getSellerInfos(apiUrl, sellerId, columns) {
        let ret = {}
        let sellerInfos, date

        try {
            sellerInfos = await fetch(`${apiUrl}/sellers/${sellerId}?include=${columns}`)

            date = new Date(sellerInfos.headers.get("date"))

            sellerInfos = await sellerInfos.json()
            // sellerInfos = sellerInfos.records

            // console.log(sellerInfos)

            ret.ok = true
            ret.date = date
            ret.sellerInfos = sellerInfos
        }
        catch(err) {
            ret.ok = false
            ret.date = undefined
            ret.sellerInfos = undefined
            ret.error = err
        }

        return ret
    }

    async updateLocalSellerInfos(data, sellerId) {
        let ret = {}

        data.id = sellerId
        console.log(data)

        try {
            const pk = await this.db.sellersList.put(data)

            ret.ok = true
            ret.pk = pk
            // console.log(pk)
        }
        catch(err) {
            console.log(err)

            ret.ok = false
            ret.pk = undefined
            ret.error = err
        }

        return ret
    }

    async getCreditTokensValue(apiUrl, sellerId) {
        let ret = {}
        let creditTokens, date

        try {
            creditTokens = await fetch(`${apiUrl}/sellers/${sellerId}?include=credit_tokens`)

            date = new Date(creditTokens.headers.get("date"))

            creditTokens = await creditTokens.json()

            ret.ok = true
            ret.date = date
            ret.creditTokens = creditTokens.credit_tokens
        }
        catch(err) {
            ret.ok = false
            ret.date = undefined
            ret.creditTokens = undefined
            ret.error = err
        }

        return ret
    }
}