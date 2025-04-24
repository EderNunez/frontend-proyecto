const form = document.querySelector("form");

const showDonationAlert = (message, isError = false) => {
  const modal = new bootstrap.Modal(document.getElementById("donationModal"));
  const modalTitle = document.getElementById("donationModalLabel");
  const modalBody = document.getElementById("donationMessage");

  modalTitle.textContent = isError ? "¡Error!" : "¡Éxito!";
  modalTitle.classList.toggle("text-danger", isError);
  modalBody.textContent = message;
  modal.show();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const requiredFields = [
    "nombre",
    "apellido",
    "tipo_donacion",
    "email",
    "monto",
  ];
  const isValid = requiredFields.every(
    (field) => document.getElementById(field).value.trim() !== ""
  );

  if (!isValid) {
    showDonationAlert("Por favor complete todos los campos requeridos", true);
    return;
  }

  const form_data = {
    Nombre: document.getElementById("nombre").value,
    Apellido: document.getElementById("apellido").value,
    Tipo_Donacion: document.getElementById("tipo_donacion").value,
    Correo: document.getElementById("email").value,
    Teléfono: document.getElementById("telefono").value,
    Monto: parseFloat(document.getElementById("monto").value),
    TipoDocumento: document.getElementById("Idetificacion").value,
    Documento: document.getElementById("documento").value,
    MetodoPago: document.getElementById("metodo-pago").value,
  };
  fetch(
    "https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/donaciones",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...form_data,
        Fecha: new Date().toISOString(),
        x_user_id: parseInt(localStorage.getItem("userId")),
      }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    })
    .then((data) => {
      showDonationAlert("Donación realizada con éxito");
      form.reset();
    })
    .catch((error) => {
      const errorMessage = error.detail || "Error al procesar la donación";
      showDonationAlert(errorMessage, true);
      console.error("Error:", error);
    });
});
