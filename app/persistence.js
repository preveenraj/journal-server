import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js";


// Fetch users from Firestore
async function fetchUsers() {
    try {
        const usersRef = collection(db, "users");
        const userSnapshot = await getDocs(usersRef);
        const users = userSnapshot.docs.map(doc => doc.data());
       
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function fetchUser(userId = "919656012662") {
    try {
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);
  
        const user = userSnapshot.data();
        console.log("🚀 ~ user", user)
        const source = user.source;
        for (const item of source) {
            console.log("🚀 ~ timestamp", item.timestamp)
            console.log("🚀 ~ text", item.text)
        }
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// append item to source array
async function appendSource(userId = "919656012662", item = {
    timestamp: new Date(),
    text: "Hello World!"
}) {
    try {
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);
        const user = userSnapshot.data();
        const source = user.source;
        source.push(item);
        await updateDoc(userRef, {
            source: source
        });
        return user;
    } catch (error) {
        console.error('Error appending:', error);
        throw error;
    }
}


// Usage example
// fetchUser()
//     .then(users => {
//         console.log('Fetched users:', users);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

export { fetchUsers, fetchUser, appendSource };