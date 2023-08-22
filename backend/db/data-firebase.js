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

const databaseName = "students";

async function getStudents(db) {
  const studentsCollection = collection(db, databaseName);
  const studentsSnapshot = await getDocs(studentsCollection);
  const studentList = studentsSnapshot.docs.map(
    (doc) => doc.id + JSON.stringify(doc.data())
  );
  return studentList;
}
//const studentList = await getStudents(db);
//console.log(studentList);

export const getStudentList = async () => {
  try {
    const response = [];
    const querySnapshot = await getDocs(collection(db, databaseName));
    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        student: doc.data(),
      };
      response.push(selectedItem);
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const readOneStudent = async (idResponse) => {
  let response = [];
  const q = query(
    collection(db, databaseName),
    where("ID", "==", parseInt(idResponse))
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    response.push({
      id: doc.id,
      student: doc.data(),
    });
  });
  return response;
};

export const readStudentByFirebaseID = async (idResponse) => {
  let response = [];
  const studentRef = doc(db, databaseName, idResponse);
  const docSnapshot = await getDoc(studentRef);

  if (docSnapshot.exists()) {
    response.push({
      id: docSnapshot.id,
      student: docSnapshot.data(),
    });
    return response;
  } else {
    return null; // Document with the given ID doesn't exist
  }
};

export const createOneStudent = async (req) => {
  const docRef = await addDoc(collection(db, databaseName), req);
  return docRef.id;
};

export const updateOneStudent = async (id, body) => {
  const studentDocumentId = doc(db, databaseName, id);
  await updateDoc(studentDocumentId, body);
};

export const deleteStudent = async (id) => {
  await deleteDoc(doc(db, databaseName, id));
};
