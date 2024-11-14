// Función para mostrar la categoria de cada producto. 
function mostrarAnillos(){
    window.location.href = 'sesionAnillos.html';
}

function mostrarCaravanas(){
    window.location.href = 'sesionCaravanas.html';
}

function mostrarCollares(){
    window.location.href = 'sesionCollares.html';
}



// Función para registrar usuarios y almacenarlos en local storage. 

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioRegistro");
    

    const almacenarDatos = () => {
            
            //Capturar los datos obtenidos en los inputs
            const nombre = document.getElementById("nombreUsuario").value.trim();
            const apellido = document.getElementById("apellidoUsuario").value.trim();
            const genero = document.getElementById("generoUsuario").value;
            const correo = document.getElementById("correoUsuario").value.trim();
            const contraseña = document.getElementById("contraseñaUsuario").value;

            //Guardar los datos en un arreglo 
                const usuario = {
                    "ID": Date.now(),
                    "Nombre": nombre,
                    "Apellido": apellido,
                    "Genero": genero,
                    "Correo": correo,
                    "Contraseña": contraseña
                }
            
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
            usuarios.push(usuario)
            guardarEnLocalStorage(usuarios)
            
            document.location.href = 'ingresarUsuarios.html'
    }

    const guardarEnLocalStorage = (arregloUsuarios) => {
        localStorage.setItem("usuarios", JSON.stringify(arregloUsuarios))
    }

    

    const obtenerUsuarios = () => {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
        usuarios.forEach(usuario => {
            console.log (`ID: ${usuario.ID}, Nombre: ${usuario.Nombre}, Correo: ${usuario.Correo}, Contraseña: ${usuario.Contraseña}`);
        });
    }

    formulario.addEventListener("submit", (e) => {
        almacenarDatos();
        
    });

    obtenerUsuarios();

    //Ingresar usarios.
    const iniciarSesion = () => {
        const correo = document.getElementById("correoUsuario").value.trim();
        const contraseña = document.getElementById("contraseñaUsuario").value;
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
        const usuarioEncontrado = usuarios.find(
            usuario => usuario.Correo === correo && usuario.Contraseña === contraseña
        );
        if (usuarioEncontrado) {
            obtenerUsuarios();
        }
    }

    
    


})


