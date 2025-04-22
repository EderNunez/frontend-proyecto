const sendPeticion = () => {
  const textarea = document.getElementById("textarea-peticion");
  const peticion = textarea.value;
  fetch("https://app-4b0c04ba-7831-4c7b-9652-558268a476a9.cleverapps.io/peticiones", {
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
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Peticion enviada");
      console.log(data);
    })
    .catch((error) => console.log("error", error));
};
