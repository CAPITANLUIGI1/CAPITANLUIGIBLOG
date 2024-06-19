// script.js

let usuarioActual = null; // Variable para almacenar el usuario actual
let publicaciones = []; // Array para almacenar publicaciones (simulado)

// Cargar publicaciones al inicio (si existen en localStorage)
if (localStorage.getItem('publicaciones')) {
    publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
    cargarPublicaciones(); // Cargar las publicaciones almacenadas
}

// Función para cargar publicaciones en el muro
function cargarPublicaciones() {
    const listaPublicaciones = document.getElementById('listaPublicaciones');
    listaPublicaciones.innerHTML = ''; // Limpiar muro de publicaciones antes de cargarlas de nuevo

    publicaciones.forEach(pub => {
        const div = document.createElement('div');
        div.classList.add('publicacion');
        div.innerHTML = `
            <h3>${pub.autor}</h3>
            <p>${pub.contenido}</p>
            ${pub.urlImagen ? `<img src="${pub.urlImagen}" alt="Imagen">` : ''}
        `;
        listaPublicaciones.appendChild(div);
    });
}

// Función para publicar una nueva entrada en el muro
function publicarEntrada(contenido, urlImagen) {
    const autor = usuarioActual ? usuarioActual.nombre : 'Anónimo'; // Si no hay usuario, publicar como Anónimo
    publicaciones.unshift({ autor, contenido, urlImagen }); // Agregar entrada al inicio del array (para orden cronológico inverso)
    guardarPublicaciones(); // Guardar las publicaciones en localStorage
    cargarPublicaciones(); // Mostrar las publicaciones actualizadas
}

// Función para guardar las publicaciones en localStorage
function guardarPublicaciones() {
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
}

// Evento para submit del formulario de nueva publicación
document.getElementById('formNuevaPublicacion').addEventListener('submit', function(event) {
    event.preventDefault();
    const contenido = document.getElementById('contenido').value;
    const urlImagen = document.getElementById('urlImagen').value;

    publicarEntrada(contenido, urlImagen); // Publicar nueva entrada en el muro
    // Limpiar campos del formulario
    document.getElementById('contenido').value = '';
    document.getElementById('urlImagen').value = '';
});

// Simulación de datos de usuarios (podrían cargarse desde una base de datos en un entorno real)
const usuarios = [
    { username: 'usuario1', password: 'pass123', nombre: 'Usuario Uno', descripcion: 'Bienvenido a mi perfil.' },
    { username: 'usuario2', password: 'pass456', nombre: 'Usuario Dos', descripcion: 'Aquí comparto mis pensamientos.' }
];

// Cargar datos del localStorage al inicio (si existen)
if (localStorage.getItem('usuarioActual')) {
    usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
}

if (localStorage.getItem('publicaciones')) {
    publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
}

// Función para cargar perfil de usuario
function cargarPerfil(usuario) {
    const perfil = document.getElementById('perfil');
    perfil.style.display = 'block';
    document.getElementById('nombreUsuario').textContent = usuario.nombre;
    document.getElementById('descripcionUsuario').textContent = usuario.descripcion;
    document.getElementById('cerrarSesion').style.display = 'block'; // Mostrar botón de cerrar sesión
    document.getElementById('nuevaPublicacion').style.display = 'block'; // Mostrar formulario de nueva publicación
    // Mostrar foto de perfil (simulada con color de fondo)
    document.getElementById('fotoPerfil').style.backgroundColor = getRandomColor();
}

// Función para cargar publicaciones en el muro
function cargarPublicaciones() {
    const listaPublicaciones = document.getElementById('listaPublicaciones');
    listaPublicaciones.innerHTML = ''; // Limpiar muro de publicaciones antes de cargarlas de nuevo

    publicaciones.forEach(pub => {
        const div = document.createElement('div');
        div.classList.add('publicacion');
        div.innerHTML = `
            <h3>${pub.autor}</h3>
            <p>${pub.contenido}</p>
            ${pub.urlImagen ? `<img src="${pub.urlImagen}" alt="Imagen">` : ''}
        `;
        listaPublicaciones.appendChild(div);
    });
}

// Función para publicar una nueva entrada en el muro
function publicarEntrada(contenido, urlImagen) {
    const autor = usuarioActual.nombre; // Obtener nombre del usuario actual
    publicaciones.unshift({ autor, contenido, urlImagen }); // Agregar entrada al inicio del array (para orden cronológico inverso)
    guardarPublicaciones(); // Guardar las publicaciones en localStorage
    cargarPublicaciones(); // Mostrar las publicaciones actualizadas
}

// Función para guardar las publicaciones en localStorage
function guardarPublicaciones() {
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
}

// Función para generar un color aleatorio (simulado para la foto de perfil)
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Mostrar modal de inicio de sesión
const modal = document.getElementById('modal');
const btnAbrirModal = document.getElementById('btnAbrirModal');
const spanCerrarModal = document.getElementsByClassName('close')[0];

btnAbrirModal.addEventListener('click', function() {
    modal.style.display = 'block';
});

spanCerrarModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Evento para submit del formulario de inicio de sesión
document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuario = usuarios.find(user => user.username === username && user.password === password);
    if (usuario) {
        usuarioActual = usuario; // Establecer usuario actual
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual)); // Guardar usuario en localStorage
        document.getElementById('formLogin').reset(); // Limpiar formulario de inicio de sesión
        cargarPerfil(usuario); // Cargar perfil del usuario
        cargarPublicaciones(); // Cargar las publicaciones existentes (simulado)
        modal.style.display = 'none'; // Cerrar modal de inicio de sesión
    } else {
        alert('Credenciales incorrectas.');
    }
});

// Evento para submit del formulario de nueva publicación
document.getElementById('formNuevaPublicacion').addEventListener('submit', function(event) {
    event.preventDefault();
    const contenido = document.getElementById('contenido').value;
    const urlImagen = document.getElementById('urlImagen').value;

    publicarEntrada(contenido, urlImagen); // Publicar nueva entrada en el muro
    // Limpiar campos del formulario
    document.getElementById('contenido').value = '';
    document.getElementById('urlImagen').value = '';
});

// Evento para cerrar sesión
document.getElementById('cerrarSesion').addEventListener('click', function(event) {
    localStorage.removeItem('usuarioActual'); // Limpiar usuario actual en localStorage
    localStorage.removeItem('publicaciones'); // Limpiar publicaciones en localStorage
    usuarioActual = null; // Limpiar usuario actual
    publicaciones = []; // Limpiar array de publicaciones
    document.getElementById('perfil').style.display = 'none'; // Ocultar perfil
    document.getElementById('nuevaPublicacion').style.display = 'none'; // Ocultar formulario de nueva publicación
    document.getElementById('cerrarSesion').style.display = 'none'; // Ocultar botón de cerrar sesión
    cargarPublicaciones(); // Actualizar muro vacío
});

// Al cargar la página, verificar si hay un usuario logueado para mostrar su perfil y publicaciones
window.addEventListener('load', function() {
    if (usuarioActual) {
        cargarPerfil(usuarioActual);
        cargarPublicaciones();
    }
});
