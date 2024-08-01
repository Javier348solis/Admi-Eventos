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
        Swal.fire({
            title: '¡Alerta!',
            text: ('No se puede agregar tareas o eventos vacios'),
            icon: 'error',
            timer: 3000
          }); 
    } else {
//Se crea una lista de objetos para darle el 'valor' a esos inputs 
        let espaciosTareas = {
            agregar: agregar.value,
            fecha: fecha.value,
            hora: hora.value,
            seleccionarET: seleccionarET.value,
        };

//Se verifica si la  tarea ya existe o no, esto para evitar que se agregue las mismas tareas mas de una vez
        let tareaLista = agregarTareas.find(user =>
            agregar.value === user.agregar ||
            hora.value === user.hora
        );

        if (tareaLista) {
            alert("La tarea o evento ya existe");
        } else {
            //Si no se cumple, se agregaa la tarea con un alert de agregado con exito
            Swal.fire({
                title: '¡Exito!',
                text: ('Se agrego satisfactoriamente'),
                icon: 'success',
                timer: 3000
              }); 
              //Utilizamos el metodo push para que las tareas se vean reflejadas en el localstorage
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
//Creamos una funcion para mostrar las tareas en la pagina, creamos unas etiquetas de parrafo y botones, donde le damos las funciones de funcionalidad a cada uno 
function mostrarTareas() {
    let listaDeTareas = document.getElementById("listaDeTareas");
    listaDeTareas.innerHTML = ""; 

    if (agregarTareas.length === 0) {
        let p = document.createElement("p");
        p.textContent = "No hay tareas";
        listaDeTareas.appendChild(p);
    } else {
        //Utilizamos una funcion foreacch para que itere sobre cada una de mis etiquetas, y luego ejecute
        agregarTareas.forEach((tarea, indice) => {
            let li = document.createElement("li");
            let botonEli = document.createElement("button");
            let botonEdi = document.createElement("button");

    //Agregamos lo que queremos de texto o se quiere mostrar en la pagina 
            li.textContent = `Tarea o Evento: ${tarea.agregar} Fecha: ${tarea.fecha} Hora: ${tarea.hora}`;
            botonEdi.textContent = "Editar";
            botonEli.textContent = "Eliminar";

            //Se define la clase a cada uno de los botones para darle estilos 
            botonEdi.classList.add('boton-editar');
            botonEli.classList.add('boton-eliminar');
            li.classList.add('lista');

    //Utilizamos un appenchild para que el contenedor padre contenga un contenedor hijo y asi se muestre lo que se quiere ver en la pagina
            listaDeTareas.appendChild(li);
            listaDeTareas.appendChild(botonEli);
            listaDeTareas.appendChild(botonEdi);

    //Creamos la funcion de boton eliminar con su respectiva alerta
            botonEli.addEventListener("click", function () {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "¡No podrás revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, bórralo!',
                    cancelButtonText: 'Cancelar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                    eliminarTarea(indice);
                      Swal.fire(
                        '¡Borrado!',
                        'Tu archivo ha sido borrado.',
                        'success'
                      )
                    }
                  });
             
            });
    //Creamos una funcion para el boton editar
            botonEdi.addEventListener("click", function () {
                editar(indice);
            });
        });
    }
}

//Se crea una funcion que recorra el index desde la pocision numero uno y asi se ejecute la fncion de eliminar
function eliminarTarea(index) {
    agregarTareas.splice(index, 1);
    localStorage.setItem("agregarTareas", JSON.stringify(agregarTareas));
    mostrarTareas();
}
let btnEditar = document.getElementById("botonEditar")
//Se utiliza la funcion para mostrar el formulario que se quiere usar en editar
function editar(index) {
    let mostrarEditarTitulo = document.getElementById("espaciosTareasEditar1");
    let mostrarEditarFecha = document.getElementById("espaciosTareasEditar2");
    let mostrarEditarHora = document.getElementById("espaciosTareasEditar3");


    mostrarEditarTitulo.value = agregarTareas[index]?.agregar || '';
    mostrarEditarFecha.value = agregarTareas[index]?.fecha || '';
    mostrarEditarHora.value = agregarTareas[index]?.hora || '';

    //Se mostrara los campos de edicion y los botones correspondientes
    mostrarEditarTitulo.style.display = "block";
    mostrarEditarFecha.style.display = "block";
    mostrarEditarHora.style.display = "block";
    btnEditar.style.display = "block";

    //Se le da la funcion al boton editar
    btnEditar.onclick = () => confirmarEdicion(index);
}

//Se ocnfirma y se guarda los cambios que se hicieron por medio del formulario editar 
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

    //Se da una validacion para que se oculte los campos de editar tareas o eventos 
    mostrarEditarTitulo.style.display = "none";
    mostrarEditarFecha.style.display = "none";
    mostrarEditarHora.style.display = "none";
    btnEditar.style.display = "none";

    mostrarTareas(); //Se actualiza la lista de tareas desde el localstorage 
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

//Se mostraran las tareas al uno cargar la pagina
mostrarTareas();
