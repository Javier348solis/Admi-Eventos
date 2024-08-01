const boton = document.getElementById("botonRegistro")
const nombre = document.getElementById("espacioNombre")
const correo = document.getElementById("espacioCorreo")
const contrasena = document.getElementById("espacioContra")

let usuarioRegistro = JSON.parse(localStorage.getItem("usuarioRegistro")) || []
//Validacion de los espacios vacios, que al agregar o enviar informacion sin nada, te envie una alerta
boton.addEventListener("click", function (e){
    e.preventDefault()
    if (nombre.value === "" || correo.value==="" || contrasena.value==="") {
        Swal.fire({
            title: '¡Alerta!',
            text: 'Los campos estan vacios',
            icon: 'error',
            timer: 3000
          });
        return
       //Si todos los espacios estan llenos, permitir que el usuario pueda pasar al inicio de sesion
    } else if(!nombre.value === "" || !correo.value==="" || !contrasena.value==="") {
        Swal.fire({
            title: '¡Bienvenido!',
            text: `Hola ${nombre.value} `,
            icon: 'success',
            timer: 3000
          }); 
    }
    //Se define una lista de objetos que vamos a necesitar para darle la validacion a los espacios de los inputs 
     let usuario = {
        nombre: nombre.value,
        correo: correo.value,
        contra: contrasena.value,
     }
//Esta es una validacion para que el .find recorra el localstorage usuario por usuario y te diga si el usuario existe o no. (Se usa mas que tod para que no se guarden dos usuarios con los mismos datos)
     let existe = usuarioRegistro.find(user => user.nombre === usuario.nombre || user.correo === usuario.correo);
            if (existe) {
                Swal.fire({
                    title: '¡Alerta!',
                    text: 'El usuario ya existe',
                    icon: 'error',
                    timer: 3000
                  });
//Si se qcumple lo de la validacion, te mostrara una alerta que te diga que fuistes registrado
            }else{
                usuarioRegistro.push(usuario)
                localStorage.setItem("usuarioRegistro", JSON.stringify(usuarioRegistro))
                Swal.fire({
                    title: '¡Bienvenido!',
                    text: 'Usuarios registrado con exito',
                    icon: 'success',
                    timer: 3000
                  });
                  setTimeout(() => {
                    window.location.href='Inicio.html'
                  }, 3000);
            }   
        }
) 
