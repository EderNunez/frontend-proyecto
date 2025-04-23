const login = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username == "" || password == "") {
    alert("Por favor ingrese su usuario y contraseña");
    return;
  }
  const link = `https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/auth/login`;
  fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      Usuario: username,
      Contraseña: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const username = data.usuario.Usuario;
      const rol = data.usuario.Rol;
      const id = data.usuario.ID_Usuario;
      console.log(data.mensaje);
      localStorage.setItem("user", username);
      localStorage.setItem("rol", rol);
      localStorage.setItem("userId", id);
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      const errorModal = new bootstrap.Modal(
        document.getElementById("errorModal")
      );
      errorModal.show();
    });
};
