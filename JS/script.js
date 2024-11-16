document.addEventListener("DOMContentLoaded", () => {
    const botonRegistrar = document.getElementById("botonRegistrar");
    const botonIniciarSesion = document.getElementById("botonInicioSesion");
    
    // Función para registrar usuarios y almacenarlos en local storage. 
    const almacenarDatos = () => {
        // Capturar los datos obtenidos en los inputs
        const nombre = document.getElementById("nombreUsuario").value.trim();
        const apellido = document.getElementById("apellidoUsuario").value.trim();
        const genero = document.getElementById("generoUsuario").value;
        const correo = document.getElementById("correoUsuario").value.trim();
        const contraseña = document.getElementById("contraseñaUsuario").value;

        // Crear un objeto del usuario
        const usuario = {
            "ID": Date.now(),
            "Nombre": nombre,
            "Apellido": apellido,
            "Genero": genero,
            "Correo": correo,
            "Contraseña": contraseña
        };

        // Guardar los datos en el local storage
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Redirige a la página de inicio de sesión
        window.location.href = 'ingresarUsuarios.html';
    };

    // Función para iniciar sesión
    const iniciarSesion = () => {
        const correo = document.getElementById("correoUsuario").value.trim();
        const contraseña = document.getElementById("contraseñaUsuario").value;
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Buscar al usuario en el local storage
        const usuarioEncontrado = usuarios.find(
            usuario => usuario.Correo === correo && usuario.Contraseña === contraseña
        );

        // Si se encuentra el usuario, lo guarda como usuarioActual
        if (usuarioEncontrado) {
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
            console.log('Inicio de sesión exitoso.');
            window.location.href = 'index.html';
        } else {
            console.log("Usuario o contraseña incorrectos");
        }
    };

    // Agregar los eventos a los botones
    if (botonIniciarSesion) {
        botonIniciarSesion.addEventListener("click", iniciarSesion);
    }

    if (botonRegistrar) {
        botonRegistrar.addEventListener("click", almacenarDatos);
    }

    // Función para mostrar los datos del usuario en index.html
    const mostrarDatosUsuario = () => {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

        if (usuarioActual) {
            const divInfoUsuario = document.getElementById("infoUsuario");

            // Mostrar la información del usuario
            divInfoUsuario.innerHTML = `
                <p>${usuarioActual.Nombre}</p>
                <button id="botonCerrarSesion">Cerrar sesión</button>
            `;

            // Agregar el evento de cerrar sesión
            const botonCerrarSesion = document.getElementById('botonCerrarSesion');
            if (botonCerrarSesion) {
                botonCerrarSesion.addEventListener('click', () => cerrarSesion());
            }
        }
        else {
            console.log("No hay usuario autenticado.");
        }
    };

    // Llamar la función para mostrar los datos del usuario en index.html
    mostrarDatosUsuario();
});

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
}

const nav = document.getElementById("nav");
const abrir = document.getElementById("abrirMenu");
const cerrar = document.getElementById("cerrarMenu");

abrir.addEventListener('click', () => {
    nav.classList.add("visible");
    abrir.style.display = 'none';
})

cerrar.addEventListener('click', () => {
    nav.classList.remove("visible");
    abrir.style.display = 'block';
})


