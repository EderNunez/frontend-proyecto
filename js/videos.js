const create_card_container_videos = (
  thumbnailURL,
  name,
  date,
  link,
  videoContainer
) => {
  const videoElement = document.createElement("div");
  videoElement.classList.add("col-md-4", "mb-3");

  // Crear la imagen de la tarjeta
  const image = document.createElement("img");
  image.src = thumbnailURL;
  image.alt = name;
  image.classList.add("card-img-top");

  // Crear el cuerpo de la tarjeta
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column");

  // Crear el título de la tarjeta
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = name;

  // Crear el texto de la tarjeta
  const text = document.createElement("p");
  text.classList.add("card-text");
  const strong = document.createElement("strong");
  strong.textContent = "Fecha:";
  text.appendChild(strong);
  text.appendChild(document.createTextNode(` ${date}`));

  // Crear el botón de ver video
  const viewButton = document.createElement("a");
  viewButton.href = link;
  viewButton.target = "_blank";
  viewButton.classList.add("btn", "btn-warning");
  viewButton.textContent = "Ver Video";

  // Crear el botón de eliminar
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "delete-btn");
  deleteButton.textContent = "Eliminar";

  // Agregar los elementos al cuerpo de la tarjeta
  cardBody.appendChild(title);
  cardBody.appendChild(text);
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("mt-auto", "d-grid", "gap-2");
  buttonContainer.appendChild(viewButton);
  buttonContainer.appendChild(deleteButton);
  cardBody.appendChild(buttonContainer);

  // Agregar la imagen y el cuerpo de la tarjeta al elemento de video
  videoElement.appendChild(image);
  videoElement.appendChild(cardBody);

  // Agregar el elemento de video al contenedor de videos
  videoContainer.appendChild(videoElement);

  // Agregar funcionalidad al botón de eliminar
  deleteButton.addEventListener("click", function () {
    videoElement.remove();
  });

  videoContainer.appendChild(videoElement);

  // Agregar funcionalidad al botón de eliminar
  videoElement
    .querySelector(".delete-btn")
    .addEventListener("click", function () {
      videoElement.remove();
    });
};

/**
 * Agrega el formulario para agregar videos
 * @returns {void}
 */
const add_form_videos = () => {
  const section = document.getElementById("videoFormContainer");

  //Crea el título del formulario
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "mb-3");
  h2.textContent = "Agregar Video Programado";

  //Crea el formulario
  const form = document.createElement("form");
  form.setAttribute("id", "videoForm");

  //Crea la primera sección del formulario
  const div1 = document.createElement("div");
  div1.setAttribute("class", "mb-3");

  //Crea el input para el nombre del video
  const label1 = document.createElement("label");
  label1.setAttribute("for", "videoName");
  label1.setAttribute("class", "form-label");
  label1.textContent = "Nombre del video";

  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("id", "videoName");
  input1.setAttribute("class", "form-control");
  input1.setAttribute("placeholder", "Ingresa el nombre del video");
  input1.setAttribute("required", "");

  div1.appendChild(label1);
  div1.appendChild(input1);

  //Crea la segunda sección del formulario
  const div2 = document.createElement("div");
  div2.setAttribute("class", "mb-3");

  //Crea el input para el link del video
  const label2 = document.createElement("label");
  label2.setAttribute("for", "videoLink");
  label2.setAttribute("class", "form-label");
  label2.textContent = "Link del video";

  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("id", "videoLink");
  input2.setAttribute("class", "form-control");
  input2.setAttribute(
    "placeholder",
    "Ej: https://www.youtube.com/watch?v=XXXX"
  );
  input2.setAttribute("required", "");

  div2.appendChild(label2);
  div2.appendChild(input2);

  // Crea la tercera sección del formulario
  const div3 = document.createElement("div");
  div3.setAttribute("class", "mb-3");

  //Crea el input para la fecha de publicación
  const label3 = document.createElement("label");
  label3.setAttribute("for", "videoDate");
  label3.setAttribute("class", "form-label");
  label3.textContent = "Fecha de publicación";

  const input3 = document.createElement("input");
  input3.setAttribute("type", "date");
  input3.setAttribute("id", "videoDate");
  input3.setAttribute("class", "form-control");
  input3.setAttribute("required", "");

  div3.appendChild(label3);
  div3.appendChild(input3);

  //Crea el botón para agregar el video
  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("class", "btn btn-warning text-dark rounded-pill me-2");
  button.setAttribute("onmouseover", "this.classList.add('btn-dark')");
  button.setAttribute("onmouseout", "this.classList.remove('btn-dark')");
  button.textContent = "AGREGAR VIDEO";

  form.appendChild(div1);
  form.appendChild(div2);
  form.appendChild(div3);
  form.appendChild(button);

  section.appendChild(h2);
  section.appendChild(form);

  //Crea el contenedor para los videos
  const videoContainer = document.createElement("div");
  videoContainer.setAttribute("id", "videoContainer");
  videoContainer.setAttribute("class", "row mt-4");

  section.appendChild(videoContainer);
};

const extractYouTubeID = (url) => {
  const match = url.split("=");
  return match ? match[1] : null;
};

const getVideos = () => {
  fetch("https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/videos", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      const result = data.resultado;
      result.forEach((video) => {
        const videoId = extractYouTubeID(video.Enlace);
        const thumbnailURL = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const videoContainer = document.getElementById("videoContainer");
        create_card_container_videos(thumbnailURL, video.Título,video.Fecha_Publicacion, video.Enlace, videoContainer);
      });
    })
    .catch((error) => console.error(error));
};

if (localStorage.getItem("rol") == "Administrador") {
  add_form_videos();

  document.addEventListener("DOMContentLoaded", function () {
    const videoForm = document.getElementById("videoForm");
    const videoContainer = document.getElementById("videoContainer");

    videoForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("videoName").value;
      const link = document.getElementById("videoLink").value;
      const date = document.getElementById("videoDate").value;
      console.log(name, link, date);

      // Extraer el ID del video usando una expresión regular robusta
      const videoId = extractYouTubeID(link);
      if (!videoId) {
        alert("Formato de enlace no reconocido.");
        return;
      }

      // Construir la URL de la imagen (thumbnail) de YouTube
      const thumbnailURL = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      fetch("https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Título: name,
          Enlace: link,
          Fecha_Publicacion: new Date(date).toISOString(),
          x_user_id: parseInt(localStorage.getItem("userId")),
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data["mensaje"]);
        })
        .catch((error) => console.error(error));

      // Crear la tarjeta (card) para el video
      create_card_container_videos(
        thumbnailURL,
        name,
        date,
        link,
        videoContainer
      );

      videoForm.reset();
    });
  });
}
getVideos();
