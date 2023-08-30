const serverURL = "http://localhost:3000";

const studentsContainer = document.getElementById("studentsContainer");
const fileInput = document.getElementById("photo");
const preview = document.getElementById("preview");
var urlTemp = "";
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
fileInput.addEventListener("change", function (event) {
  const selectedFile = event.target.files[0];

  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const fileExtension = selectedFile.name
    .toLowerCase()
    .substring(selectedFile.name.lastIndexOf("."));
  if (!allowedExtensions.includes(fileExtension)) {
    alert(
      "Tipo de archivo no válido. Solo se permiten archivos .jpg, .png y .gif."
    );
    preview.style.display = "none";
    fileInput.value = null;
    return;
  }

  if (selectedFile.type.startsWith("image/")) {
    preview.style.display = "block";
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }
});
document.getElementById("showStudentsButton").addEventListener("click", () => {
  studentsContainer.style.display = "block";
  readAllProducts();
});
document
  .getElementById("showOneStudentsButton")
  .addEventListener("click", () => {
    try {
      const idDeBusqueda = document.getElementById("input1").value.trim();
      if (idDeBusqueda === "") {
        alert("campo sin datos");
      }
      console.log(idDeBusqueda);
      const studentsContainer = document.getElementById("studentsContainer");
      studentsContainer.style.display = "block";
      buscarPorId(idDeBusqueda);
    } catch (error) {
      console.error(error);
    }
  });


// document.getElementById("subirFoto").addEventListener("click", function () {
//   const photoInput = document.getElementById("photo");

//   if (photoInput.files.length > 0) {
//     const selectedPhoto = photoInput.files[0];
//     subirFoto(selectedPhoto);
//   } else {
//     console.log("Please select a photo.");
//   }
// });

document.getElementById("createStudent").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value.trim();
  const photoInput = document.getElementById("photo");
  const selectedPhoto = photoInput.files[0];
  subirFoto(selectedPhoto);

  setTimeout(() => {
    const url = urlTemp;
    const object = {
      nombre: name,
      precio: id,
      url: url,
    };
    crearObjecto(object);
    console.log(object);
  }, 3000);
});
document.getElementById("deleteStudentButton").addEventListener("click", () => {
  const id = document.getElementById("input2").value.trim();
  eliminarProducto(id);
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

export function crearObjecto(object) {
  try {
    console.log(object);
    fetch(`${serverURL}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error in create:", error);
  }
}

export function eliminarProducto(id) {
  //const url = new URL(serverURL)
  //const params = {item_id:studentid}
  //url.search = new URLSearchParams(params).toString();

  try {
    fetch(`${serverURL}/api/delete/${id}`, {
      method: "DELETE",
      params: id,
    });
    alert("Eliminador Correctamente");
  } catch (error) {
    console.error(error);
    throw new Error("Error in delete:", error);
  }
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
