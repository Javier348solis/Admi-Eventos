//Las primeras dos lineas son variables que se llaman directamente de html mediante un ID para darle funcion al NavBar
const boton = document.getElementById("btn-menu")
const menu = document.getElementById("menu")
//Constantes definidas desde el html con ID para darle funcion a los inputs que agregaran las tareas
const agregar = document.getElementById("espaciosTareas1")
const fecha = document.getElementById("espaciosTareas2")
const hora = document.getElementById("espaciosTareas3")
const botoncito = document.getElementById("botonAgregar")
const contenedor = document.getElementById("input-salida")
let isOpen =false;

let agregarTareas = JSON.parse(localStorage.getItem("agregarTareas")) || []

//Validacion de los espacios vacios de los inputs que agregaran las tareas o eventos
botoncito.addEventListener("click", ()=>{
    if (agregar.value ==="" || fecha.value === "" || hora.value === "") {
        alert("No se pueden agregar tareas o eventos vacios")
    }else{
        alert("Se agrego satisfactoriamente")
    }
})
//Se define un objeto, para luego darle el valor a los inputs que se necesitan
let espaciosTareas = {
    agregar: agregar.value,
    fecha: fecha.value,
    hora: hora.value,
}
contenedor.innerHTML = `
        <p><strong>Tarea o Evento:</strong> ${agregar}</p>
         <p><strong>Fecha:</strong> ${fecha}</p>
          <p><strong>Hora:</strong> ${hora}</p>
`

//Funcion que se le dio al boton del navbar, si esta abierto, se mantiene verdadero, si esta cerrado, falso.
boton.addEventListener("click", ()=> {
    if(isOpen) {
        menu.classList.remove("menu-active");
        isOpen = false
    } else {
        menu.classList.add("menu-active")
        isOpen =true
    }
})
 