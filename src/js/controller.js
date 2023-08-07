export default class Fs {
    constructor() {
        this.version = "1.0"
    }

    getVersion() {
        return this.version
    }

    initDb(Db, Wrapper) {
        const intitFsDb = new Db()
        const initDexie = new Wrapper("FsDb")
        
        let myFsDb = intitFsDb.dbStructure(initDexie, Wrapper)
    }
}