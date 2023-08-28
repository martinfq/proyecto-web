import { storage} from "../config/firebase.js";
import { ref, uploadBytes } from "firebase/storage";


export async function uploadFile(file, nameimg) {
    const metadata = {
        contentType: 'image/jpg'
      };

    const storageRef = ref(storage, nameimg)
    uploadBytes(storageRef,file, metadata).then(snap => {
        console.log(snap);
    })
    return true
}

