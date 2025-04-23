const username = localStorage.getItem("user");
const rol = localStorage.getItem("rol");

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("rol");
  window.location.href = "../html/login.html";
};
const add_button_logout = () => {
  const usernameP = document.createElement("h4");
  usernameP.textContent = username;

  const rolP = document.createElement("p");
  rolP.textContent = rol;

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "logout");
  button.setAttribute("onclick", "logout()");
  button.setAttribute("class", "btn btn-warning text-dark rounded-pill me-2");
  button.setAttribute("onmouseover", "this.classList.add('btn-light')");
  button.setAttribute("onmouseout", "this.classList.remove('btn-light')");
  button.textContent = "Cerrar sesión";

  const nameUser = document.getElementById("name-user");
  nameUser.appendChild(usernameP);
  nameUser.appendChild(rolP);
  nameUser.appendChild(button);
};

const add_button_login = () => {
  const button2 = document.createElement("button");
  button2.setAttribute("type", "button");
  button2.setAttribute("class", "login");
  button2.setAttribute("onclick", "location.href='html/login.html'");
  button2.setAttribute("class", "btn btn-warning text-dark rounded-pill me-2");
  button2.setAttribute("onmouseover", "this.classList.add('btn-light')");
  button2.setAttribute("onmouseout", "this.classList.remove('btn-light')");
  button2.textContent = "Iniciar Sesión";
  document.getElementById("name-user").appendChild(button2);
};

const add_menu_asistence = (li, nav) => {
  const a = document.createElement("a");
  a.textContent = "ASISTENCIA";
  a.setAttribute("href", "html/asistencia.html");
  a.setAttribute("id", "asistencia-link");
  a.setAttribute("class", "nav-link text-white fw-bold fs-5");
  a.setAttribute(
    "onmouseover",
    "this.classList.replace('text-white', 'text-warning')"
  );
  a.setAttribute(
    "onmouseout",
    "this.classList.replace('text-warning', 'text-white')"
  );

  li.appendChild(a);
  nav.appendChild(li);

  const donaciones = document.getElementById("donaciones-link");
  donaciones.setAttribute("href", "../html/donacion-admin.html");
}

if (username != null) {
  add_button_logout();

  if (rol == "Administrador") {
    const nav = document.getElementsByClassName("nav")[0];
    const li = document.createElement("li");
    li.setAttribute("class", "nav-item");
    add_menu_asistence(li, nav);
    const donaciones = document.getElementById("peticiones-link");
    donaciones.setAttribute("href", "../html/peticiones-admin.html");
  }  
} else {
  add_button_login();
}  
