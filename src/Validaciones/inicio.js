const correo = document.getElementById("linea-correo")
const contrasenaa = document.getElementById("linea-contra")    // en estas lineas se llama los id declarados en el HTML
const botoncito = document.getElementById("boton-inicio")

const usuarioRegistro = JSON.parse(localStorage.getItem("usuarioRegistro")) //Aqui se utiliza el JSON parse para recorrer los datos del localStorage 
btn4.addEventListener("click", () => {
      let usuarioEncontrado = usuarioRegistro.find(u=> u.correo === correo.value && u.contrasena===contrasenaa.value)
       if (usuarioEncontrado) {                                        //Find se utiliza con un for para encontrar las posiciones que necesita cada input
        alert("Datos correctos")  
        window.location.href="index.html"                  //Esta se utiliza para redireccionar de la pagina de registro a inicio de sesion
      }else{
        alert("Usuario o contraseña incorrectos, METASE EN LA VARA!!!") //Alerta que se utiliza para indicar si los datos que estan en el local son incorrectos
      }
     
   } 
) 