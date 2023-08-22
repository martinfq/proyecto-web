//import { URL,URLSearchParams } from "url";

// js/script.js
export function fetchStudents(serverURL) {
  fetch(`${serverURL}/api/read`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const studentListElement = document.getElementById('studentList');

      studentListElement.innerHTML = '';

      // Iterar sobre los objetos en el JSON y agregar los estudiantes a la lista
      data.forEach((item) => {
        const listItem = document.createElement('li');
        const student = item.student;
        listItem.textContent = `${student.name} - ${student.age} años - Grado: ${student.grade}`;
        studentListElement.appendChild(listItem);
      });

    })
    .catch((error) => console.error('Error fetching students:', error));
}
export function buscarEstudiantePorId(serverURL,id){
  fetch(`${serverURL}/api/read/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const studentListElement = document.getElementById('studentList');

      studentListElement.innerHTML = '';

      // Iterar sobre los objetos en el JSON y agregar los estudiantes a la lista
      data.forEach((item) => {
        const listItem = document.createElement('li');
        const student = item.student;
        listItem.textContent = `${student.name} - ${student.age} años - Grado: ${student.grade}`;
        studentListElement.appendChild(listItem);
      });

    })
    .catch((error) => console.error('Error fetching students:', error));
}

export function crearEstudiante(serverURL, student){
  console.log(JSON.parse(student));
  return fetch(`${serverURL}/api/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw new Error('Error saving student:', error);
    });
}

export function eliminarEstudiante(serverURL, studentid){

  //const url = new URL(serverURL)
  //const params = {item_id:studentid}
  //url.search = new URLSearchParams(params).toString();
  return fetch(`${serverURL}/api/delete/${studentid}`, {
    params: studentid
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw new Error('Error deleting student:', error);
    });
}