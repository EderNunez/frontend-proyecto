const showPeticionAlert = (message, isError = false) => {
  const modal = new bootstrap.Modal(document.getElementById("peticionModal"));
  const modalTitle = document.getElementById("peticionModalLabel");
  const modalBody = document.getElementById("peticionMessage");

  modalTitle.textContent = isError ? "¡Error!" : "¡Éxito!";
  modalTitle.classList.toggle("text-danger", isError);
  modalBody.textContent = message;
  modal.show();
};

const sendPeticion = () => {
  const textarea = document.getElementById("textarea-peticion");
  const peticion = textarea.value.trim();
  if (!peticion) {
    showPeticionAlert("Por favor escribe tu petición antes de enviar", true);
    return;
  }
  fetch(
    "https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/peticiones",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Texto_Peticion: peticion,
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
      showPeticionAlert("Petición enviada con éxito");
      textarea.value = ""; // Limpiar textarea
    })
    .catch((error) => {
      const errorMsg = error.detail || "Error al enviar la petición";
      showPeticionAlert(errorMsg, true);
      console.error("Error:", error);
    });
};
