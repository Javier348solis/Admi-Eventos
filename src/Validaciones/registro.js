const boton = document.getElementById("botonRegistro")
const nombre = document.getElementById("espacioNombre")
const correo = document.getElementById("espacioCorreo")
const contrasena = document.getElementById("espacioContra")

let usuarioRegistro = JSON.parse(localStorage.getItem("usuarioRegistro")) || []

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
    } else if(!nombre.value === "" || !correo.value==="" || !contrasena.value==="") {
        Swal.fire({
            title: '¡Bienvenido!',
            text: `Hola ${nombre.value} `,
            icon: 'success',
            timer: 3000
          }); 
    }
     let usuario = {
        nombre: nombre.value,
        correo: correo.value,
        contra: contrasena.value,
     }

     let existe = usuarioRegistro.find(user => nombre === user.nombre || correo === user.correo);
            if (existe) {
                Swal.fire({
                    title: '¡Alerta!',
                    text: 'Los campos estan vacios',
                    icon: 'error',
                    timer: 3000
                  });
            }else{
                usuarioRegistro.push(usuario)
                localStorage.setItem("usuarioRegistro", JSON.stringify(usuarioRegistro))
                Swal.fire({
                    title: '¡Bienvenido!',
                    text: 'Usuarios registrado con exito',
                    icon: 'success',
                    timer: 3000
                  });
                window.location.href='Inicio.html'
            }   
        }
) 
