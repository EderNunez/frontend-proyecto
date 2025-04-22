fetch("http://127.0.0.1:8000/peticiones", {
  method: "GET",
  headers: {
    Accept: "application/json",
    "x-user-id": parseInt(localStorage.getItem("userId")),
  },
})
  .then((data) => data.json())
  .then((data) => {
    const result = data.resultado;
    result.forEach((peticion) => {
      const peticionContainer = document.getElementById("peticiones");
      const row = document.createElement("tr");
      const cells = [
        peticion.ID_Peticion,
        peticion.ID_Usuario,
        peticion.Texto_Peticion,
        peticion.Fecha.split("T")[0],
      ];
      console.log(cells);
      cells.forEach((cell) => {
        const cellElement = document.createElement("td");
        cellElement.textContent = cell;
        row.appendChild(cellElement);
      });
      peticionContainer.appendChild(row);
    });
  })
  .catch((error) => {
    console.error(error);
  });
