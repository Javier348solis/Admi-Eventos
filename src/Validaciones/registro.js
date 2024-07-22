const boton = document.getElementById("botonRegistro")
const nombre = document.getElementById("espacioNombre")
const correo = document.getElementById("espacioCorreo")
const contrasena = document.getElementById("espacioContra")

let usuarioRegistro = JSON.parse(localStorage.getItem("usuarioRegistro")) || []

boton.addEventListener("click", function (e){
    e.preventDefault()
     let usuario = {
        nombre: nombre.value,
        correo: correo.value,
        contra: contrasena.value,
     }
     let existe = usuarioRegistro.find(user => nombre === user.nombre || correo === user.correo);
            if (existe) {
                alert("El usuario ya existe")
            }else{
                usuarioRegistro.push(usuario)
                localStorage.setItem("usuarioRegistro", JSON.stringify(usuarioRegistro))
            }   
        }
)