const baseUrl = "http://127.0.0.1:8000/miembros";
let selectedCulto = "";
let currentRecords = [];

const ocultarSecciones = () => {
  document.getElementById("seccionAsistencia").style.display = "none";
  document.getElementById("seccionEliminar").style.display = "none";
};

const mostrarAsistencia = () => {
  ocultarSecciones();
  document.getElementById("seccionAsistencia").style.display = "block";
  fetchRecords();
};

const mostrarEliminar = () => {
  ocultarSecciones();
  document.getElementById("seccionEliminar").style.display = "block";
  fetchRecords();
};

const fetchRecords = () => {
  document.getElementById("tablaCuerpo").innerHTML = "";
  selectedCulto = document.getElementById("seleccionarCulto").value;
  fetch(baseUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      currentRecords = result.data;
      handleTableData(currentRecords.filter((record) => record.Culto === selectedCulto));
    })
    .catch((error) => console.log("error", error));
};

const handleTableData = (records) => {
  records.forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${record.Nombre}</td>
    <td>${record.Apellido}</td>
    <td>${record.Telefono}</td>
    <td>${record.Barrio}</td>
    <td>${record.Direccion}</td>
    <td>${record.Cargo}</td>
    <td>${record.Bautizado == 1 ? "Si" : "No"}</td>
    <td>${record.Fecha}</td>
    <td>${record.Culto}</td>
    `;
    document.getElementById("tablaCuerpo").appendChild(row);
  });
};

const addRecord = () => {
  const culto = document.getElementById("seleccionarCulto").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("telefono").value;
  const barrio = document.getElementById("barrio").value;
  const direccion = document.getElementById("direccion").value;
  const cargo = document.getElementById("cargo").value;
  const bautizado = Boolean(document.getElementById("bautizado").value);
  const fecha = document.getElementById("fecha").value;

  fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Nombre: nombre,
      Apellido: apellido,
      Telefono: telefono,
      Barrio: barrio,
      Direccion: direccion,
      Cargo: cargo,
      Bautizado: bautizado,
      Fecha: new Date(fecha).toISOString(),
      Culto: culto,
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      alert(res["mensaje"]);
      console.log(res);
    }).catch((error) => console.log("error", error));
};

// Al cargar la página, se asigna el listener para seleccionar culto
document.addEventListener("DOMContentLoaded", () => {
  const selectCulto = document.getElementById("seleccionarCulto");
  selectCulto.addEventListener("change", function () {
    selectedCulto = this.value;
    console.log("Culto seleccionado:", selectedCulto);
    if (selectedCulto) {
      document.getElementById("opcionesCulto").style.display = "block";
      // Por defecto, se muestra la sección de asistencia (donde se registra la asistencia)
      mostrarAsistencia();
    } else {
      document.getElementById("opcionesCulto").style.display = "none";
      ocultarSecciones();
    }
  });
});
