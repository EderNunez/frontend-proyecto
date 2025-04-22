const registrar = () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("password-confirm").value;

  fetch("http://127.0.0.1:8000/auth/registro", {
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
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data["mensaje"]);
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error(error);
      alert("Error al registrar el usuario");
    });
};
