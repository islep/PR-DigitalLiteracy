import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
async function getUserData(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data(); // return the user document data
    } else {
        console.log("No such document!");
    }
}
export default getUserData;