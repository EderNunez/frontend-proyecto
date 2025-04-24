const registrar = () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("password-confirm").value;

  fetch(
    "https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/auth/registro",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Usuario: username,
        Correo: email,
        Contraseña: password,
        ConfirmarContraseña: passwordConfirm,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("successModalMessage").textContent =
        "¡Registro completado!";
      new bootstrap.Modal(document.getElementById("successModal")).show();

      // Redirigir después de 3 segundos
      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    })
    .catch((error) => {
      console.error(error);
      // Mostrar modal
      document.getElementById("errorModalMessage").textContent =
        "Error al registrar el usuario";
      new bootstrap.Modal(document.getElementById("errorModal")).show();
    });
};
