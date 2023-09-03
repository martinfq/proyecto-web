const serverURL = "http://localhost:3000";

const studentsContainer = document.getElementById("studentsContainer");
const fileInput = document.getElementById("photo");
const fotoActualizar = document.getElementById("fotoActualizar");
const preview = document.getElementById("preview");
const previewActualizar = document.getElementById("previewActualizar");
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
fotoActualizar.addEventListener("change", function (event) {
  const selectedFile = event.target.files[0];

  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const fileExtension = selectedFile.name
    .toLowerCase()
    .substring(selectedFile.name.lastIndexOf("."));
  if (!allowedExtensions.includes(fileExtension)) {
    alert(
      "Tipo de archivo no válido. Solo se permiten archivos .jpg, .png y .gif."
    );
    previewActualizar.style.display = "none";
    fotoActualizar.value = null;
    return;
  }

  if (selectedFile.type.startsWith("image/")) {
    previewActualizar.style.display = "block";
    const reader = new FileReader();
    reader.onload = function (e) {
      previewActualizar.src = e.target.result;
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
      const studentsContainer2 = document.getElementById("studentsContainer2");
      studentsContainer2.style.display = "block";
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
  const name = document.getElementById("name").value;
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

document.getElementById("botonActualizar").addEventListener("click", () =>{
  const name = document.getElementById("nombreActualizar").value;
  const id = document.getElementById("idActualizar").value.trim();
  const precio = document.getElementById("precioActualizar").value.trim();
  const photoInput = document.getElementById("fotoActualizar");

  if(photoInput){
    const selectedPhoto = photoInput.files[0];
    subirFoto(selectedPhoto);
  }

  setTimeout(() => {
    const url = urlTemp;
    const object = {
      nombre: name,
      precio: precio,
      url: url,
    };
    actualizarObjeto(object,id);
    console.log(object);
  }, 3000);

})

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
      //console.log(data);
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
      const studentListElement2 = document.getElementById("studentList2");

      studentListElement2.innerHTML = "";

      // Iterar sobre los objetos en el JSON y agregar los estudiantes a la lista
      data.forEach((item) => {
        const listItem = document.createElement("li");
        const product = item.product;
        listItem.textContent = `${product.nombre} - ${product.precio} precio - url: ${product.url}`;
        studentListElement2.appendChild(listItem);
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

function actualizarObjeto(object,id){
  try {
    fetch(`${serverURL}/api/update/${id}`, {
      method: "PUT",
      params: id,
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