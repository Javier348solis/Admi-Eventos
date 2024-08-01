const correo = document.getElementById("linea-email")
const contrasenaa = document.getElementById("linea-contra")    // en estas lineas se llama los id declarados en el HTML
const botoncito = document.getElementById("boton-inicio")

const usuarioRegistro = JSON.parse(localStorage.getItem("usuarioRegistro")) || []//Aqui se utiliza el JSON parse para recorrer los datos del localStorage 
botoncito.addEventListener("click", () => {

  let usuarioEncontrado = false; // Variable para saber si se encontró el usuario

  for (let i = 0; i < usuarioRegistro.length; i++) {
    if (correo.value === usuarioRegistro[i].correo && contrasenaa.value === usuarioRegistro[i].contra) {
      usuarioEncontrado = true;
      break; // Si encontramos el usuario, salimos del bucle
    }
  }
  
  if (usuarioEncontrado) {
    // Si se encontró el usuario, redireccionamos a index.html
    window.location.href = "index.html";
  } else {
    // Si no se encontró el usuario, mostramos el mensaje de alerta
    swal("Usuario no encontrado.");
  }
  
    }    
) 