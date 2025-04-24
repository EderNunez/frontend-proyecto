const showNotification = (message, isError = false) => {
  const modal = new bootstrap.Modal(document.getElementById('notificationModal'));
  const modalHeader = document.getElementById('notificationModalLabel');
  const modalBody = document.getElementById('notificationMessage');
  
  modalHeader.textContent = isError ? '¡Error!' : '¡Éxito!';
  modalHeader.classList.toggle('text-danger', isError);
  modalBody.textContent = message;
  modal.show();
};
const baseUrl = "https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/miembros";
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
      handleTableData(
        currentRecords.filter((record) => record.Culto === selectedCulto)
      );
    })
    .catch((error) => {
      showNotification("Error al cargar los registros", true);
      console.error("Error:", error);
    });
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
      ID_Usuario: parseInt(localStorage.getItem("userId")),
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      showNotification(res.mensaje);
      fetchRecords(); // Actualizar tabla después de éxito
      document.getElementById("attendanceForm").reset();
    })
    .catch((error) => {
      showNotification("Error al procesar la solicitud", true);
      console.error("Error:", error);
    });
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
