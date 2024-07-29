// Las primeras dos líneas son variables que se llaman directamente de html mediante un ID para darle función al NavBar
const boton = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

// Constantes definidas desde el html con ID para darle función a los inputs que agregarán las tareas
const agregar = document.getElementById("espaciosTareas1");
const fecha = document.getElementById("espaciosTareas2");
const hora = document.getElementById("espaciosTareas3");
const botoncito = document.getElementById("botonAgregar");
const contenedor = document.getElementById("input-salida");
let isOpen = false;

let agregarTareas = JSON.parse(localStorage.getItem("agregarTareas")) || [];

// Función para manejar la adición de tareas
botoncito.addEventListener("click", () => {
    if (agregar.value === "" || fecha.value === "" || hora.value === "") {
        alert("No se pueden agregar tareas o eventos vacíos");
    } else {
        // Crear el objeto tarea
        let espaciosTareas = {
            agregar: agregar.value,
            fecha: fecha.value,
            hora: hora.value,
        };
        
        // Verificar si la tarea ya existe
        let tareaLista = agregarTareas.find(user =>
            agregar.value === user.agregar ||
            fecha.value === user.fecha ||
            hora.value === user.hora
        );

        if (tareaLista) {
            alert("La tarea ya existe");
        } else {
            alert("Se agregó satisfactoriamente");
            agregarTareas.push(espaciosTareas);
            localStorage.setItem("agregarTareas", JSON.stringify(agregarTareas));

            // Actualizar el contenedor con la nueva tarea
            contenedor.innerHTML = `
                <p><strong>Tarea o Evento:</strong> ${agregar.value}</p>
                <p><strong>Fecha:</strong> ${fecha.value}</p>
                <p><strong>Hora:</strong> ${hora.value}</p>
                <buttom>Eliminar</buttom>
            `;

            // Limpiar los inputs después de agregar la tarea
            agregar.value = "";
            fecha.value = "";
            hora.value = "";
        }
    }
});

// Función que se le dio al botón del navbar, si está abierto, se mantiene verdadero, si está cerrado, falso
boton.addEventListener("click", () => {
    if (isOpen) {
        menu.classList.remove("menu-active");
        isOpen = false;
    } else {
        menu.classList.add("menu-active");
        isOpen = true;
    }
});

 