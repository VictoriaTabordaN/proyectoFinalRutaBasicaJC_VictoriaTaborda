document.addEventListener("DOMContentLoaded", () => {
    const botonRegistrar = document.getElementById("botonRegistrar");
    const botonIniciarSesion = document.getElementById("botonInicioSesion");

    //Crear usuario administadrador
    const crearAdmin = () => {
        const correoAdmin = 'vic@gmail.com'
        const contraseñaAdmin = '123Vic'

        const adminGuardado = JSON.parse(localStorage.getItem("userAdmin"));
        if (!adminGuardado) {
            const admin = {
                "Correo": correoAdmin,
                "Contraseña": contraseñaAdmin,
            };
            localStorage.setItem("userAdmin", JSON.stringify(admin));
        }
    }

    crearAdmin();

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

        //Crear arreglo para gestionar los usuarios y añadirlos a localstorage
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        
        //Verificar si el usuario existe 
        const usuarioExiste = usuarios.find((usuario) => usuario.Correo === correo);
        if (usuarioExiste) {
            alert("El correo ingresado corresponde a una cuenta existente, ingrese otro correo porfavor.");
        }
        // Guardar los datos en el local storage
        else {
            usuarios.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert('Registro de usuario exitoso')
            console.log(usuarios)
            // Redirige a la página de inicio de sesión
            window.location.href = 'ingresarUsuarios.html';
        }
    };
    

   // Función para iniciar sesión
    const iniciarSesion = () => {
        const correo = document.getElementById("correoUsuario").value.trim();
        const contraseña = document.getElementById("contraseñaUsuario").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let admin = JSON.parse(localStorage.getItem("userAdmin"))

        if (admin && admin.Correo === correo && admin.Contraseña === contraseña){
            alert('Inicio de admnistrador exitoso')
            window.location.href = 'publicarArticulos.html';
        }

        // Buscar al usuario en el local storage
        const usuarioEncontrado = usuarios.find(
            usuario => usuario.Correo === correo && usuario.Contraseña === contraseña
        );

        // Si se encuentra el usuario, lo guarda.
        
        if (usuarioEncontrado && usuarioEncontrado !== admin) {
            localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioEncontrado));
            alert('Inicio de sesión exitoso.');
            console.log(usuarios)
            window.location.href = '../index.html';
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    // Verificar si los botones existen en la página actual y añadirles un evento
    if (botonIniciarSesion) {
        botonIniciarSesion.addEventListener("click", iniciarSesion);
    }

    if (botonRegistrar) {
        botonRegistrar.addEventListener("click", almacenarDatos);
    }

    // Función para mostrar los datos del usuario en la pagina principal
    const mostrarDatosUsuario = () => {
        const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
        const botonInicio = document.getElementById('botonIniciarSesion');
        const botonRegistro = document.getElementById('botonRegistro');

        if (usuarioRegistrado) {
            const divInfoUsuario = document.getElementById("infoUsuario");
            
            botonInicio.style.display = 'none';
            botonRegistro.style.display = 'none';

            // Mostrar la información del usuario
            divInfoUsuario.innerHTML = `
                <p>${usuarioRegistrado.Nombre}</p>
                <button id="botonCerrarSesion">Cerrar sesión</button>
            `;

            // Agregar el evento de cerrar sesión
            const botonCerrarSesion = document.getElementById('botonCerrarSesion');
            if (botonCerrarSesion) {
                botonCerrarSesion.addEventListener('click', cerrarSesion);
            }
        }
        
    };

    // Función para cerrar sesión
    const cerrarSesion = () => {
        const botonInicio = document.getElementById('botonIniciarSesion');
        const botonRegistro = document.getElementById('botonRegistro');
        
        localStorage.removeItem('usuarioRegistrado');
        window.location.reload();
        
        botonInicio.style.display = 'block';
        botonRegistro.style.display = 'block';
        cerrarSesion.style.display = 'none';
    
    };

    
    mostrarDatosUsuario();
    
});

// Funcionalidad para el menú desplegable
function desplegarMenu () {
    const nav = document.getElementById("nav");
    const abrir = document.getElementById("abrirMenu");
    const cerrar = document.getElementById("cerrarMenu");

    if(abrir){
        abrir.addEventListener('click', () => {
            nav.classList.add("visible");
            abrir.style.display = 'none';
        });
    }

    if(cerrar){
        cerrar.addEventListener('click', () => {
            nav.classList.remove("visible");
            abrir.style.display = 'block';
        });
    }
        
}
desplegarMenu()

// Función para subir productos 
function subirProductos (){

    const getProductosPorCategoria = (categoria) => {
        return JSON.parse(localStorage.getItem(`productos${categoria}`)) || [];
    };
    
    const guardarProductoPorCategoria = (categoria, producto) => {
        const productos = getProductosPorCategoria(categoria);
        productos.push(producto);
        localStorage.setItem(`productos${categoria}`, JSON.stringify(productos));
    };

    const añadirProducto = document.getElementById("botonAñadirProducto");
    
    if (añadirProducto){
    añadirProducto.addEventListener('click', () => {
        
            const nombre = document.getElementById("nombreProducto").value.trim();
            const precio = document.getElementById("precioProducto").value.trim();
            const descripcion = document.getElementById("descripcionProducto").value.trim();
            const categoria = document.getElementById("categoriaProducto").value.trim();
            const imagen = document.getElementById("subirImagen");
        
            
            const file = imagen.files[0];
            
            // Crear un lector de archivos
            const reader = new FileReader();
        
            reader.onload = (e) => {
                // Crear el objeto del producto con la imagen en base64
                const producto = {
                    "ID": Date.now(),
                    "Nombre": nombre,
                    "Precio": precio,
                    "Descripcion": descripcion,
                    "Categoria": categoria,
                    "Imagen": e.target.result, 
                };
        
                // Validar la categoría y guardar el producto
                if (["Anillos", "Caravanas", "Collares"].includes(categoria)) {
                    guardarProductoPorCategoria(categoria, producto);
                    alert(`Producto añadido a la categoría ${categoria}`);
                    console.log(producto)
                } else {
                    alert("Categoría no válida. Usa Anillos, Caravanas o Collares.");
                }
            };
        
            
            reader.readAsDataURL(file);
        
    }) }

    //Función para añadir productos desde usuario administrador.
    const cargarProductos = () => {
        const paginaActual = window.location.pathname;
        let categoria = "";
    
        if (paginaActual.includes("sesionAnillos.html")) categoria = "Anillos";
        else if (paginaActual.includes("sesionCaravanas.html")) categoria = "Caravanas";
        else if (paginaActual.includes("sesionCollares.html")) categoria = "Collares";
    
        if (categoria) {
            const productos = getProductosPorCategoria(categoria);
            const seccion = document.querySelector(".categoria");
            
            productos.forEach(producto => {
                const productoHTML = `
                    <div class="productos">
                        <img src="${producto.Imagen}" class="imagenProducto">
                        <div class="elementosProductos">
                            <h4>${producto.Nombre}</h4>
                            <p><b>${producto.Precio}</b></p>
                            <p>${producto.Descripcion}</p>
                            <button class="btn-comprar">Comprar</button>
                        </div>
                    </div>
                `;
                seccion.insertAdjacentHTML("beforeend", productoHTML);
            })
            
            console.log(categoria, productos);
    }; }
    cargarProductos()
}
subirProductos()





