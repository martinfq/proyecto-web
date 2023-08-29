const serverURL = "http://localhost:3000";

var urlTemp = "";

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

document.getElementById("showStudentsButton").addEventListener("click", () => {
  const studentsContainer = document.getElementById("studentsContainer");
  studentsContainer.style.display = "block";
  readAllProducts();
});
document
  .getElementById("showOneStudentsButton")
  .addEventListener("click", () => {
    try {
      const id = document.getElementById("input1").value;
      if (id === "") {
        alert("campo sin datos");
      }
      console.log(id);
      const studentsContainer = document.getElementById("studentsContainer");
      studentsContainer.style.display = "block";
      buscarPorId(id);
    } catch (error) {
      console.error(error);
    }
  });

document.getElementById("subirFoto").addEventListener("click", function () {
  const photoInput = document.getElementById("age");

  if (photoInput.files.length > 0) {
    const selectedPhoto = photoInput.files[0];
    subirFoto(selectedPhoto);
  } else {
    console.log("Please select a photo.");
  }
});

document.getElementById("createStudent").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value.trim();
  const url = urlTemp;
  const student = {
    nombre: name,
    precio: id,
    url: url,
  };

  crearEstudiante(student);
  console.log(student);
});
document.getElementById("deleteStudentButton").addEventListener("click", () => {
  id = document.getElementById("input2").value;
  eliminarEstudiante("http://localhost:3000", id);
  console.log(student);
});

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

export function readAllProducts() {
  fetch(`${serverURL}/api/read`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const studentListElement = document.getElementById("studentList");

      studentListElement.innerHTML = "";

      // Iterar sobre los objetos en el JSON y agregar los estudiantes a la lista
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
export function buscarPorId(id) {
  fetch(`${serverURL}/api/read/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const studentListElement = document.getElementById("studentList");

      studentListElement.innerHTML = "";

      // Iterar sobre los objetos en el JSON y agregar los estudiantes a la lista
      data.forEach((item) => {
        const listItem = document.createElement("li");
        const product = item.product;
        listItem.textContent = `${product.nombre} - ${product.precio} precio - url: ${product.url}`;
        studentListElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error al buscar:", error));
}

export function crearEstudiante(student) {
  try {
    console.log(student);
    fetch(`${serverURL}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
  } catch (error) {
    console.error(error);
    throw new Error("Error in create:", error);
  }
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

export function subirFoto(foto) {
  const formData = new FormData();
  formData.append("photo", foto);
  var temp = "";
  try {
    fetch(`${serverURL}/api/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        urlTemp = data[0];
      });
  } catch (error) {
    console.error(error);
    throw new Error("Error in upload photo:", error);
  }
}
