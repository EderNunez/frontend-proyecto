const API_URL = "https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/donaciones";

const tbody = document.getElementById("donaciones");

fetch(API_URL, {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-user-id": parseInt(localStorage.getItem("userId")),
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en al respuesta");
    }
    return response.json();
  })
  //cambiar según las pruebas de la api
  .then((data) => {
    tbody.innerHTML = "";
    data.resultado.forEach((donacion) => {
      const row = document.createElement("tr");

      const cells = [
        donacion.Nombre,
        donacion.Apellido,
        donacion.Tipo_Donacion,
        donacion.Correo,
        donacion.Teléfono,
        donacion.Monto,
        donacion.TipoDocumento,
        donacion.Documento,
        donacion.MetodoPago,
        donacion.Fecha,
      ];

      cells.forEach((cellData) => {
        const cell = document.createElement("td");
        cell.textContent = cellData;
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.error("Error: ", err);
    tbody.innerHTML =
      "<tr><td colspan='10'>Error al obtener los datos</td></tr>";
  });
