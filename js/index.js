const username = localStorage.getItem("user");
const rol = localStorage.getItem("rol");
let isEditing = false;

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("editProfileBtn")
    .addEventListener("click", toggleEditMode);
  document
    .getElementById("saveProfileBtn")
    .addEventListener("click", updateProfile);
});

const toggleEditMode = () => {
  isEditing = !isEditing;
  document.getElementById("profileEmail").disabled = !isEditing;
  document.getElementById("profilePassword").disabled = !isEditing;

  document.getElementById("editProfileBtn").style.display = isEditing
    ? "none"
    : "inline-block";
  document.getElementById("saveProfileBtn").style.display = isEditing
    ? "inline-block"
    : "none";
};

const showNotificationModal = (message, type) => {
  const modal = new bootstrap.Modal(
    document.getElementById("notificationModal")
  );
  const modalBody = document.getElementById("notificationMessage");
  const modalTitle = document.getElementById("notificationModalLabel");

  modalTitle.textContent = type === "success" ? "¡Éxito!" : "¡Error!";
  modalTitle.className = `modal-title text-${
    type === "success" ? "success" : "danger"
  }`;
  modalBody.textContent = message;
  modal.show();
};

const updateProfile = () => {
  const newEmail = document.getElementById("profileEmail").value;
  const newPassword = document.getElementById("profilePassword").value;
  const username = localStorage.getItem("user");

  fetch(
    "https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/auth/update",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Usuario: username,
        Contraseña: newPassword || undefined,
        Correo: newEmail,
      }),
    }
  )
    .then((response) => {
      if (!response.ok)
        return response.json().then((err) => {
          throw err;
        });
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("email", newEmail);
      showNotificationModal("Perfil actualizado correctamente", "success");
      toggleEditMode();
    })
    .catch((error) => {
      showNotificationModal(
        error.detail || "Error al actualizar el perfil",
        "error"
      );
      console.error("Error:", error);
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("rol");
  localStorage.removeItem("email");
  window.location.href = "html/login.html";
};
const add_button_logout = () => {
  const usernameP = document.createElement("h4");
  usernameP.textContent = username;

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

const showProfile = () => {
  document.getElementById("profileUsername").value =
    localStorage.getItem("user") || "-";
  document.getElementById("profileEmail").value =
    localStorage.getItem("email") || "No disponible";
  document.getElementById("profilePassword").value = "";

  const profileModal = new bootstrap.Modal(
    document.getElementById("profileModal")
  );
  profileModal.show();
};

const add_profile_button = () => {
  const profileButton = document.createElement("button");
  profileButton.textContent = "Ver Perfil";
  profileButton.className = "btn btn-info text-dark rounded-pill me-2";
  profileButton.onclick = showProfile;

  // Efectos hover
  profileButton.onmouseover = () => profileButton.classList.add("btn-light");
  profileButton.onmouseout = () => profileButton.classList.remove("btn-light");

  const nameUser = document.getElementById("name-user");
  nameUser.insertBefore(profileButton, nameUser.children[1]);
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
  donaciones.setAttribute("href", "html/donacion-admin.html");
};

if (username != null) {
  add_button_logout();
  add_profile_button();

  if (rol == "Administrador") {
    const nav = document.getElementsByClassName("nav")[0];
    const li = document.createElement("li");
    li.setAttribute("class", "nav-item");
    add_menu_asistence(li, nav);
    const donaciones = document.getElementById("peticiones-link");
    donaciones.setAttribute("href", "html/peticiones-admin.html");
  }
} else {
  add_button_login();
}
