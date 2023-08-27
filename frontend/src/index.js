//import { URL,URLSearchParams } from "url";

const axios = require("axios");

document.getElementById("showStudentsButton").addEventListener("click", () => {
  const studentsContainer = document.getElementById("studentsContainer");
  studentsContainer.style.display = "block";
  readAllProducts("http://localhost:3000");
});
document
  .getElementById("showOneStudentsButton")
  .addEventListener("click", () => {
    try {
      const temp = document.getElementById("input1").value;
      if (temp === "") {
        alert("campo sin datos");
      }
      console.log(temp);
      const studentsContainer = document.getElementById("studentsContainer");
      studentsContainer.style.display = "block";
      buscarEstudiantePorId("http://localhost:3000", temp);
    } catch (error) {
      console.error(error);
    }
  });

document.getElementById("createStudent").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const id = parseInt(document.getElementById("id").value);
  const age = parseInt(document.getElementById("age").value);
  const grade = document.getElementById("grade").value.trim();

  const student = {
    name: name,
    id: id,
    age: age,
    grade: grade,
  };

  crearEstudiante("http://localhost:3000", student);
  console.log(student);
});
document.getElementById("deleteStudentButton").addEventListener("click", () => {
  id = document.getElementById("input2").value;
  eliminarEstudiante("http://localhost:3000", id);
  console.log(student);
});
// js/script.js
function readAllProducts(serverURL) {
  axios
    .get(`${serverURL}/api/read`)
    .then((response) => {
      const data = response.data;
      console.log(response);
      const studentListElement = document.getElementById("studentList");

      studentListElement.innerHTML = "";

      // Iterate over the objects in the JSON and add students to the list
      data.forEach((item) => {
        const listItem = document.createElement("li");
        const id = item.id;
        const product = item.product;
        listItem.textContent = `id: ${id} - ${product.nombre} - ${product.precio} precio - url: ${product.url}`;
        studentListElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching students:", error));
}
export function buscarEstudiantePorId(serverURL, id) {
  fetch(`${serverURL}/api/read/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const studentListElement = document.getElementById("studentList");

      studentListElement.innerHTML = "";

      // Iterar sobre los objetos en el JSON y agregar los estudiantes a la lista
      data.forEach((item) => {
        const listItem = document.createElement("li");
        const student = item.student;
        listItem.textContent = `${student.name} - ${student.age} años - Grado: ${student.grade}`;
        studentListElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching students:", error));
}

function crearEstudiante(serverURL, student) {
  console.log(JSON.parse(student));
  return fetch(`${serverURL}/api/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw new Error("Error saving student:", error);
    });
}

export function eliminarEstudiante(serverURL, studentid) {
  //const url = new URL(serverURL)
  //const params = {item_id:studentid}
  //url.search = new URLSearchParams(params).toString();
  return fetch(`${serverURL}/api/delete/${studentid}`, {
    params: studentid,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw new Error("Error deleting student:", error);
    });
}
