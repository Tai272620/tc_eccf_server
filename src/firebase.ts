import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/* Your Config */
const firebaseConfig = {
    apiKey: "AIzaSyBeXf4DLCcZsmKRPgJc2fuXHPvepL0nCLI",
    authDomain: "coffee-app-bbb51.firebaseapp.com",
    projectId: "coffee-app-bbb51",
    storageBucket: "coffee-app-bbb51.appspot.com",
    messagingSenderId: "966201320124",
    appId: "1:966201320124:web:e8697b170a2bfe4831a6b9",
    measurementId: "G-SLVCMRPP8Q"
};
/* End Config */

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


export async function uploadFileToStorage(file: any, folderName: any, bufferData: any) {
    // nếu file là null thì không làm gì hết
    if (!file) {
        return false
    }

    let fileRef;
    let metadata;
    if (!bufferData) {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + file.name);
    } else {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + (file as any).filename);
        metadata = {
            contentType: (file as any).mimetype,
        };
    }
    let url;
    if (bufferData) {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    } else {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, file).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }


    return url
}

