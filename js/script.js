const hamburguesa = document.getElementById("hamburguesa");
const nav = document.getElementById("nav");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

/* TOGGLE MENU */
hamburguesa.addEventListener("click", () => {
    hamburguesa.classList.toggle("activo");
    nav.classList.toggle("activo");
});

/* CERRAR AL HACER CLICK */
links.forEach(link => {
    link.addEventListener("click", () => {
        hamburguesa.classList.remove("activo");
        nav.classList.remove("activo");
    });
});

/* SCROLL SPY */
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("activo");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("activo");
        }
    });
});

/* MODO CLARO / OSCURO */
const toggle = document.getElementById("modo");
const label = document.getElementById("labelModo");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggle.checked = true;
    label.textContent = "Modo oscuro";
} else {
    label.textContent = "Modo claro";
}

toggle.addEventListener("change", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        label.textContent = "Modo oscuro";
        localStorage.setItem("theme", "light");
    } else {
        label.textContent = "Modo claro";
        localStorage.setItem("theme", "dark");
    }
});

/* Variables FORMULARIO   */

const form = document.getElementById("formulario");

const nombre = document.getElementById("fname");
const apellido = document.getElementById("apellido");
const correo = document.getElementById("correo");
const servicio = document.getElementById("servicio");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("btnEnviar");

/* VALIDACIÓN EN TIEMPO REAL */

nombre.addEventListener("input", () => {
    validarNombre();
    validarFormulario();
});

apellido.addEventListener("input", () => {
    validarApellido();
    validarFormulario();
});

correo.addEventListener("input", () => {
    validarCorreo();
    validarFormulario();
});

servicio.addEventListener("change", () => {
    validarServicio();
    validarFormulario();
});

mensaje.addEventListener("input", () => {
    validarMensaje();
    validarFormulario();
});

/* VALIDACIÓN */

function validarNombre() {
    if (nombre.value.trim().length < 2) {
        setError(nombre, "error-nombre", "Debe tener al menos 2 caracteres");
        return false;
    }
    clearError(nombre, "error-nombre");
    return true;
}

function validarApellido() {
    if (apellido.value.trim().length < 2) {
        setError(apellido, "error-apellido", "Debe tener al menos 2 caracteres");
        return false;
    }
    clearError(apellido, "error-apellido");
    return true;
}

function validarCorreo() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo.value.trim())) {
        setError(correo, "error-correo", "Correo inválido");
        return false;
    }
    clearError(correo, "error-correo");
    return true;
}

function validarServicio() {
    if (servicio.value === "") {
        setError(servicio, "error-servicio", "Seleccione un servicio");
        return false;
    }
    clearError(servicio, "error-servicio");
    return true;
}

function validarMensaje() {
    if (mensaje.value.trim().length < 10) {
        setError(mensaje, "error-mensaje", "Mínimo 10 caracteres");
        return false;
    }
    clearError(mensaje, "error-mensaje");
    return true;
}

function validarFormulario() {
    const valido =
        validarNombre() &&
        validarApellido() &&
        validarCorreo() &&
        validarServicio() &&
        validarMensaje();

    btnEnviar.disabled = !valido;
}

/* UTILIDADES */

function setError(input, errorId, mensaje) {
    document.getElementById(errorId).textContent = mensaje;
    input.classList.add("input-error");
}

function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.classList.remove("input-error");
}
/* MENSAJE DE CONFIRMACIÓN FORMULARIO*/
const toast = document.getElementById("toast");
console.log("toast:", toast);
function mostrarToast() {
    if (!toast) {
        console.error("Toast no encontrado en el DOM");
        return;
    }

    toast.classList.remove("oculto");
    
    var name = document.getElementById("nombreUsuario").value;
    var name = nombre.value;

    document.getElementById("nombreUsuario").innerText = name;

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.classList.add("oculto");
        }, 300);
    }, 3000);
}

/* VALIDACIÓN AL ENVIAR EL FORMULARIO*/

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valido = true;

    if (!validarNombre()) valido = false;
    if (!validarApellido()) valido = false;
    if (!validarCorreo()) valido = false;
    if (!validarServicio()) valido = false;
    if (!validarMensaje()) valido = false;

    if (!valido) return;
    
    console.log("Nombre:", nombre.value);
    console.log("Apellido:", apellido.value);
    console.log("Correo:", correo.value);
    console.log("Servicio:", servicio.value);
    console.log("Mensaje:", mensaje.value);
    
    btnEnviar.disabled = true;

    mostrarToast();
    form.reset();

    btnEnviar.disabled = false;
    validarFormulario();

});