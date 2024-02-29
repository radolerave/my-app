import FsDb from './model.js'

export default class FsDbTransaction extends FsDb {
    constructor(Wrapper) {
        super(Wrapper)
    }
    
    async newTransaction(url, args) {
        let ret = {}
        let dateOperation = null

        try {
            if(await this.silentSignIn(url)) {//credentials must be verified to be able to update anything
                // Construct the API endpoint URL for creating the item
                const updateUrl = `${url}/transactions`;
                const updatedData = args.updatedData

                //do a verification process before continuing*********** (credentials)

                // Send a POST request to create the item
                let createNewTransactionOperation = await fetch(updateUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any necessary authentication headers here
                    },
                    body: JSON.stringify(updatedData),
                })

                dateOperation = new Date(createNewTransactionOperation.headers.get("date"))

                let createdItem = await createNewTransactionOperation.json()

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

    // async getTransactions(url, args, type = null) {
    //     let ret = {}
    //     let dateOperation = null

    //     try {
    //         if(await this.silentSignIn(url)) {//credentials must be verified
    //             const sellerId = args.sellerId
    //             let publicationsList

    //             if(type === null) {
    //                 publicationsList = await fetch(`${url}/publications?filter=seller_id,eq,${sellerId}&filter=enabled,eq,1&order=last_edit,desc`)
    //             }
    //             else {
    //                 publicationsList = await fetch(`${url}/publications?filter=seller_id,eq,${sellerId}&filter=enabled,eq,1&filter=type,eq,${type}&order=last_edit,desc`)
    //             }

    //             dateOperation = new Date(publicationsList.headers.get("date"))

    //             publicationsList = await publicationsList.json()
    //             publicationsList = publicationsList.records
                
    //             ret = {
    //                 ok: true,
    //                 date: dateOperation,
    //                 records : publicationsList
    //             }
    //         }
    //         else {
    //             ret = {
    //                 ok: false,
    //                 date: null,
    //                 records: [],
    //                 errorCode: 1,
    //                 errorText: "Vos informations d'identification ne correspondent pas, veuillez vous reconnecter."
    //             }
    //         }
    //     }
    //     catch(error) {
    //         console.error('Error updating item:', error);
    //         // Handle error

    //         ret = {
    //             ok: false,
    //             date: null,
    //             records : [],
    //             errorCode: 0,
    //             errorText: "Vérifiez votre connexion au serveur. Assurez vous d'être connecté(e) à Internet."
    //         }
    //     }

    //     return ret
    // }

    // async getTransactionsPublicMode(url, args, type = null, all = false) {
    //     let ret = {}
    //     let dateOperation = null

    //     try {
    //         let publicationsList, sellerId

    //         if(all == false) {
    //             sellerId = args.sellerId                

    //             if(type === null) {
    //                 publicationsList = await fetch(`${url}/publications?filter=seller_id,eq,${sellerId}&filter=enabled,eq,1&filter=published,eq,1&order=last_edit,desc`)
    //             }
    //             else {
    //                 publicationsList = await fetch(`${url}/publications?filter=seller_id,eq,${sellerId}&filter=enabled,eq,1&filter=published,eq,1&filter=type,eq,${type}&order=last_edit,desc`)
    //             }
    //         }
    //         else {
    //             if(type === null) {
    //                 publicationsList = await fetch(`${url}/publications?filter=enabled,eq,1&filter=published,eq,1&order=last_edit,desc`)
    //             }
    //             else {
    //                 let formData = new FormData()

    //                 formData.append("params", JSON.stringify({
    //                     where: {
    //                         enabled: 1,
    //                         published: 1,
    //                         type: type
    //                     }
    //                 }))

    //                 publicationsList = await fetch(`https://server2.atria.local/findseller/get_publications.php`, {
    //                     method: 'POST',
    //                     body: formData,
    //                 })
    //             }
    //         }

    //         dateOperation = new Date(publicationsList.headers.get("date"))

    //         publicationsList = await publicationsList.json()
    //         publicationsList = publicationsList.records
            
    //         ret = {
    //             ok: true,
    //             date: dateOperation,
    //             records : publicationsList,
    //             noControls : true
    //         }
    //     }
    //     catch(error) {
    //         console.error('Error updating item:', error);
    //         // Handle error

    //         ret = {
    //             ok: false,
    //             date: null,
    //             records : [],
    //             noControls : true,
    //             errorCode: 0,
    //             errorText: "Vérifiez votre connexion au serveur. Assurez vous d'être connecté(e) à Internet."
    //         }
    //     }

    //     return ret
    // }

    async updateTransaction(url, args) {
        let ret = {}
        let dateOperation = null

        try {
            if(await this.silentSignIn(url)) {//credentials must be verified to be able to update anything
                // Construct the API endpoint URL for updating the item
                const updateUrl = `${url}/transactions/${args.transactionId}`;
                const updatedData = args.updatedData

                //do a verification process before continuing*********** (credentials)

                // Send a PUT request to update the item
                let updateTransactionOperation = await fetch(updateUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any necessary authentication headers here
                    },
                    body: JSON.stringify(updatedData),
                })

                dateOperation = new Date(updateTransactionOperation.headers.get("date"))

                let updatedItem = await updateTransactionOperation.json()

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
}