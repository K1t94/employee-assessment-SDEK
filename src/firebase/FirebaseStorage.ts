import {storage} from 'firebase'
import Firebase from "./Firebase"
import {registerIn} from "react-ioc"
import App from "../App"

@registerIn(() => App)
class FirebaseStorage extends Firebase {
    addImage(image: File): storage.UploadTask {
        return this.storage.ref(`images/${image.name}`).put(image);
    }

    images(): storage.Reference {
        return this.storage.ref('images');
    }

    async addImageWithLinkReturn(image: File): Promise<string> {
        try {
            await this.addImage(image);
            return await this.images().child(image.name).getDownloadURL();
        } catch (e) {
            throw new Error(e)
        }
    }
}

export default FirebaseStorage
