const nombreEspa = document.getElementById("espacioName")
const correoEspa = document.getElementById("espacioMail")
const preguntaEspa = document.getElementById("espacioPregunta")
const boton = document.getElementById("boton")

let contactoUsua = JSON.parse(localStorage.getItem("contactoUsua")) || []

boton.addEventListener("click", function (e){
    e.preventDefault
    if (nombreEspa.value === "" || correoEspa === "" || preguntaEspa === "") {
        alert("Por favor, rellene los espacios")
    } else {
        alert("Formulario enviado con exito")
    }
    let espaciosContacto = {
        nombreEspa: nombreEspa.value,
        correoEspa: correoEspa.value,
        preguntaEspa: preguntaEspa.value,
    }
    contactoUsua.push(espaciosContacto)
    localStorage.setItem("contactoUsua", JSON.stringify(contactoUsua))
})