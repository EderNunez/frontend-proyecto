const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const tipoDonacion = document.getElementById("tipo_donacion").value;
  const correo = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const monto = document.getElementById("monto").value;
  const tipoDocumento = document.getElementById("Idetificacion").value;
  const documento = document.getElementById("documento").value;
  const metodoPago = document.getElementById("metodo-pago").value;
  fetch("http://127.0.0.1:8000/donaciones", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      Nombre: nombre,
      Apellido: apellido,
      Tipo_Donacion: tipoDonacion,
      Correo: correo,
      Teléfono: telefono,
      Monto: parseFloat(monto),
      TipoDocumento: tipoDocumento,
      Documento: documento,
      MetodoPago: metodoPago,
      Fecha: new Date().toISOString(),
      x_user_id: parseInt(localStorage.getItem("userId")),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Donación realizada con exito");
      console.log(data)
    })
    .catch((error) => console.error("Error:", error));
});
