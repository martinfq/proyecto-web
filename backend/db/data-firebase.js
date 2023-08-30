import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { db } from "../config/firebase.js";

const databaseName = "products";

async function getProducts(db) {
  const studentsCollection = collection(db, databaseName);
  const studentsSnapshot = await getDocs(studentsCollection);
  const studentList = studentsSnapshot.docs.map(
    (doc) => doc.id + JSON.stringify(doc.data())
  );
  return studentList;
}
console.log(await getProducts(db));

export const getProductList = async () => {
  try {
    const response = [];
    const querySnapshot = await getDocs(collection(db, databaseName));
    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        product: doc.data(),
      };
      response.push(selectedItem);
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const readProductByFirebaseID = async (idResponse) => {
  let response = [];
  const docSnapshot = await getDoc(doc(db, databaseName, idResponse));

  if (docSnapshot.exists()) {
    response.push({
      id: docSnapshot.id,
      product: docSnapshot.data(),
    });
    return response;
  } else {
    return null; // Document with the given ID doesn't exist
  }
};

export const createProduct = async (req) => {
  let response = [];
  const docRef = await addDoc(collection(db, databaseName), req);
  console.log("Elemento Creado")
  response.push(docRef.id);
  return response
};

export const updateProduct = async (id, body) => {
  const studentDocumentId = doc(db, databaseName, id);
  await updateDoc(studentDocumentId, body);
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, databaseName, id));
};
