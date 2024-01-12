export default class FileTypeIdentifier {
    constructor() {

    }

    identify(mimeType) {//image or video or other
        let ret = "other"

        switch(true) {
            case (mimeType.match(/image\//) !== null): ret = "image"
                break

            case (mimeType.match(/video\//) !== null): ret = "video"
                break

            default: 
                break
        }
        
        return ret
    }
}