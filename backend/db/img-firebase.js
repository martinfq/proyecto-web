import { storage } from "../config/firebase.js";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";

export async function uploadFile(file) {
  const metadata = {
    contentType: "image/jpg",
  };
  const response = [];
  try {
      const storageRef = ref(storage, v4());
      await uploadBytes(storageRef, file, metadata)
      const url = await getDownloadURL(storageRef);
      response.push(url);
      return response
    
  } catch (error) {
    console.error(error);
  }
}
