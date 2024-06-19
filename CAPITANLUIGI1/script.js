document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    loadPosts();
    
    document.getElementById('login-nav').addEventListener('click', function() {
        document.getElementById('login-modal').style.display = 'block';
    });

    document.getElementById('register-nav').addEventListener('click', function() {
        document.getElementById('register-modal').style.display = 'block';
    });

    document.getElementById('close-login').addEventListener('click', function() {
        document.getElementById('login-modal').style.display = 'none';
    });

    document.getElementById('close-register').addEventListener('click', function() {
        document.getElementById('register-modal').style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('login-modal')) {
            document.getElementById('login-modal').style.display = 'none';
        } else if (event.target == document.getElementById('register-modal')) {
            document.getElementById('register-modal').style.display = 'none';
        }
    });

    document.getElementById('upload-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const media = document.getElementById('media').files[0];
        let mediaURL = '';

        if (media) {
            mediaURL = URL.createObjectURL(media);
        }

        const post = {
            title: title,
            content: content,
            mediaURL: mediaURL,
            mediaType: media ? media.type : null
        };

        savePost(post);
        displayPost(post);

        document.getElementById('upload-form').reset();
    });

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('auth', JSON.stringify({ username: username }));
            checkAuthStatus();
            alert('Inicio de sesión exitoso');
            document.getElementById('login-modal').style.display = 'none';
        } else {
            alert('Nombre de usuario o contraseña incorrectos');
        }

        document.getElementById('login-form').reset();
    });

    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(user => user.username === username)) {
            alert('El nombre de usuario ya está en uso');
        } else {
            users.push({ username: username, password: password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso, ahora puede iniciar sesión');
            document.getElementById('register-modal').style.display = 'none';
            document.getElementById('register-form').reset();
        }
    });

    document.getElementById('logout-nav').addEventListener('click', function() {
        localStorage.removeItem('auth');
        checkAuthStatus();
    });

    // Mostrar perfil si el usuario está autenticado
    document.getElementById('profile-nav').addEventListener('click', function(event) {
        event.preventDefault();
        showProfile();
    });
});

function savePost(post) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => displayPost(post));
}

function displayPost(post) {
    const postContainer = document.getElementById('post-container');
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    
    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    postDiv.appendChild(postTitle);
    
    const postContent = document.createElement('p');
    postContent.textContent = post.content;
    postDiv.appendChild(postContent);
    
    if (post.mediaURL) {
        const mediaElement = document.createElement(post.mediaType.startsWith('image') ? 'img' : 'video');
        mediaElement.src = post.mediaURL;
        if (post.mediaType.startsWith('video')) {
            mediaElement.controls = true;
        }
        postDiv.appendChild(mediaElement);
    }
    
    postContainer.appendChild(postDiv);
}

function checkAuthStatus() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
        document.getElementById('upload').style.display = 'block';
        document.getElementById('profile-nav').style.display = 'inline-block'; // Mostrar el enlace al perfil
        document.getElementById('login-nav').style.display = 'none';
        document.getElementById('register-nav').style.display = 'none';
        document.getElementById('logout-nav').style.display = 'block';
    } else {
        document.getElementById('upload').style.display = 'none';
        document.getElementById('profile-nav').style.display = 'none'; // Ocultar el enlace al perfil
        document.getElementById('login-nav').style.display = 'block';
        document.getElementById('register-nav').style.display = 'block';
        document.getElementById('logout-nav').style.display = 'none';
    }
}

function showProfile() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
        const profileUsername = document.getElementById('profile-username');
        const profileBio = document.getElementById('profile-bio');

        profileUsername.textContent = auth.username;
        profileBio.textContent = 'Esta es mi biografía. Soy el creador de esta página web.';

        document.getElementById('posts').style.display = 'none';
        document.getElementById('upload').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
    }
}

