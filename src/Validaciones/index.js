const boton = document.getElementById("btn-menu")
const menu = document.getElementById("menu")
let isOpen =false;

boton.addEventListener("click", ()=> {
    if(isOpen) {
        menu.classList.remove("menu-active");
        isOpen = false
    } else {
        menu.classList.add("menu-active")
        isOpen =true
    }
})