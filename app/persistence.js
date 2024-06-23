import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase.js";
import dayjs from "dayjs";

const DEFAULT_RESOURCE = {
    source: [],
    story: "",
}

const today = dayjs().format("DD-MM-YYYY");

async function fetchUsers() {
  try {
    const usersRef = collection(db, "users");
    const userSnapshot = await getDocs(usersRef);
    const users = userSnapshot.docs.map((doc) => doc.data());

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function fetchUser(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    const user = userSnapshot.data();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function createUser(userId) {
  try {
    const userRef = await setDoc(doc(db, "users", userId), {
        userId,
    });
    const testCollection = doc(db, "users", userId, "resources", today);
    await setDoc(testCollection, DEFAULT_RESOURCE);

    return userRef;
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

async function appendSource(
  userId = "919656012662",
  item = {
    timestamp: new Date(),
    text: "Hello World!",
  }
) {
  try {
    const userRef = doc(db, "users", userId);

    // check if user exists
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      // create user in users collection
      await createUser(userId);
    }

    const docRef = doc(userRef, "resources", today);
    const docSnapshot = await getDoc(docRef);

    let source = [];
    if (docSnapshot.exists()) {
      const documentData = docSnapshot.data();
      source = documentData.source;
      source.push(item);

      await updateDoc(docRef, {
        source: source,
      });
    } else {
      // create doc if it doesn't exist
      source = [item];
      await setDoc(docRef, { source });
    }

    return source;
  } catch (error) {
    console.error("Error appending:", error);
    throw error;
  }
}

async function saveStory(userId = "919656012662", story = "Hello World!") {
  try {
    const userRef = doc(db, "users", userId);
    const docRef = doc(userRef, "resources", today);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      await updateDoc(docRef, {
        story,
      });
      return story;
    } else {
      console.log("No such document!");
    }

    return "";
  } catch (error) {
    console.error("Error saving story:", error);
    throw error;
  }
}

export { fetchUsers, fetchUser, appendSource, saveStory };
