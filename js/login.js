//Comentado por si hay que cambiarlo
/*Cambiar cuando se termine la api
const login = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username == "" || password == "") {
    alert("Por favor ingrese su usuario y contraseña");
    return;
  }

  const link =
    "https://script.googleusercontent.com/macros/echo?user_content_key=KgKQ2Oj4rtV0rU5njTbDay1B1gfJzjM_hFi0ErNrTHh9OphcOo_KdscrpZFDXvGlm8inhuQoivfrIBLMeh_A6RKIfWgUUwCFm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPHfceE88sGtwpZtrQyBlDrYyiE3E4J6IANLw4UKO6ek-fZNWCTIAQk-PABwz6Q3SHRzqbpTwz6XUUiZxydDR26CKlQg_JT939z9Jw9Md8uu&lib=MZj_kfHkoxrRpYNE8CWpKtGJUPzYgWWy8";
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      const user = data.find(
        (row) => row["USUARIO"] == username && row["CONTRASEÑA"] == password
      );
      if (user == undefined) {
        alert("Usuario o contraseña incorrectos");
        return;
      }
      localStorage.setItem("user", username);
      localStorage.setItem("rol", user["ROL"]);
      window.location.href = "../index.html";
    })
    .catch((error) => console.error(error));
};*/

const login = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username == "" || password == "") {
    alert("Por favor ingrese su usuario y contraseña");
    return;
  }
  const link = `http://127.0.0.1:8000/auth/login`;
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
      alert(error.detail);
      console.error(error);
    });
};
