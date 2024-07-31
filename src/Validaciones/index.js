// Las primeras dos líneas son variables que se llaman directamente de html mediante un ID para darle función al NavBar
const boton = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

// Constantes definidas desde el html con ID para darle función a los inputs que agregarán las tareas
const agregar = document.getElementById("espaciosTareas1");
const fecha = document.getElementById("espaciosTareas2");
const hora = document.getElementById("espaciosTareas3");
const botoncito = document.getElementById("botonAgregar");
const contenedor = document.getElementById("input-salida");
const seleccionarET = document.getElementById("seleccion");
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
            seleccionarET: seleccionarET.value,
        };

        // Verificar si la tarea ya existe
        let tareaLista = agregarTareas.find(user =>
            agregar.value === user.agregar ||
            fecha.value === user.fecha ||
            hora.value === user.hora
        );

        if (tareaLista) {
            alert("La tarea o evento ya existe");
        } else {
            alert("Se agregó satisfactoriamente");
            agregarTareas.push(espaciosTareas);
            localStorage.setItem("agregarTareas", JSON.stringify(agregarTareas));
            mostrarTareas();
            // Limpiar los inputs después de agregar la tarea
            agregar.value = "";
            fecha.value = "";
            hora.value = "";
        }
    }
});

function mostrarTareas() {
    let listaDeTareas = document.getElementById("listaDeTareas");
    listaDeTareas.innerHTML = ""; // Limpiar la lista antes de actualizar

    if (agregarTareas.length === 0) {
        let p = document.createElement("p");
        p.textContent = "No hay tareas";
        listaDeTareas.appendChild(p);
    } else {
        agregarTareas.forEach((tarea, indice) => {
            let li = document.createElement("li");
            let botonEli = document.createElement("button");
            let botonEdi = document.createElement("button");

            li.textContent = `Tarea o Evento: ${tarea.agregar} Fecha: ${tarea.fecha} Hora: ${tarea.hora}`;
            botonEdi.textContent = "Editar";
            botonEli.textContent = "Eliminar";

            botonEdi.classList.add('boton-editar');
            botonEli.classList.add('boton-eliminar');
            li.classList.add('lista');

            listaDeTareas.appendChild(li);
            listaDeTareas.appendChild(botonEli);
            listaDeTareas.appendChild(botonEdi);

            // Añadir eventos a los botones
            botonEli.addEventListener("click", function () {
                eliminarTarea(indice);
            });

            botonEdi.addEventListener("click", function () {
                editar(indice);
            });
        });
    }
}

// Función para eliminar una tarea
function eliminarTarea(index) {
    agregarTareas.splice(index, 1);
    localStorage.setItem("agregarTareas", JSON.stringify(agregarTareas));
    mostrarTareas();
}
let btnEditar = document.getElementById("botonEditar")
// Función para mostrar y preparar el formulario de edición
function editar(index) {
    let mostrarEditarTitulo = document.getElementById("espaciosTareasEditar1");
    let mostrarEditarFecha = document.getElementById("espaciosTareasEditar2");
    let mostrarEditarHora = document.getElementById("espaciosTareasEditar3");

    // Rellenar los campos con los valores actuales
    mostrarEditarTitulo.value = agregarTareas[index]?.agregar || '';
    mostrarEditarFecha.value = agregarTareas[index]?.fecha || '';
    mostrarEditarHora.value = agregarTareas[index]?.hora || '';

    // Mostrar los campos de edición y el botón
    mostrarEditarTitulo.style.display = "block";
    mostrarEditarFecha.style.display = "block";
    mostrarEditarHora.style.display = "block";
    btnEditar.style.display = "block";

    // Asignar el evento de clic al botón de edición
    btnEditar.onclick = () => confirmarEdicion(index);
}

// Función para confirmar y guardar la edición
function confirmarEdicion(index) {
    let mostrarEditarTitulo = document.getElementById("espaciosTareasEditar1");
    let mostrarEditarFecha = document.getElementById("espaciosTareasEditar2");
    let mostrarEditarHora = document.getElementById("espaciosTareasEditar3");

    let inputEditarTitulo = mostrarEditarTitulo.value;
    let inputEditarFecha = mostrarEditarFecha.value;
    let inputEditarHora = mostrarEditarHora.value;

    agregarTareas[index] = {
        agregar: inputEditarTitulo,
        fecha: inputEditarFecha,
        hora: inputEditarHora
    };

    localStorage.setItem("agregarTareas", JSON.stringify(agregarTareas));

    // Ocultar los campos de edición y el botón
    mostrarEditarTitulo.style.display = "none";
    mostrarEditarFecha.style.display = "none";
    mostrarEditarHora.style.display = "none";
    btnEditar.style.display = "none";

    mostrarTareas(); // Volver a mostrar la lista actualizada
}

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

// Mostrar las tareas al cargar la página
mostrarTareas();
