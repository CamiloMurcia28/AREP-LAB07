const app = (function () {
    const baseUrl = "http://localhost:8080";
    
    // Utilidad para mostrar notificaciones
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white transform transition-all duration-500 translate-x-full`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animación de salida
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Validación de formularios
    function validateForm(formData) {
        for (let [key, value] of Object.entries(formData)) {
            if (!value || value.trim() === '') {
                throw new Error(`${key.charAt(0).toUpperCase() + key.slice(1)} es requerido`);
            }
        }
    }

    function init() {
        // Prevenir envío tradicional del formulario
        document.getElementById("postform").addEventListener("submit", function(event) {
            event.preventDefault();
        });

        // Añadir contador de caracteres al textarea
        const textarea = document.getElementById("content");
        const maxLength = 280; // Límite de caracteres
        
        textarea.addEventListener('input', function() {
            const remaining = maxLength - this.value.length;
            let counterElement = document.getElementById('char-counter');
            
            if (!counterElement) {
                counterElement = document.createElement('div');
                counterElement.id = 'char-counter';
                counterElement.className = 'text-sm text-gray-500 text-right mt-2';
                this.parentNode.appendChild(counterElement);
            }
            
            counterElement.textContent = `${remaining} caracteres restantes`;
            
            if (remaining < 20) {
                counterElement.classList.add('text-red-500');
            } else {
                counterElement.classList.remove('text-red-500');
            }
        });

        getPosts();
        checkAuthStatus();
    }

    function initLogin() {
        document.getElementById("loginform").addEventListener("submit", function(event) {
            event.preventDefault();
        });

        // Mostrar/ocultar contraseña
        const passwordInput = document.getElementById("password");
        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.className = "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600";
        toggleButton.innerHTML = "👁";
        
        toggleButton.onclick = function() {
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        };
        
        passwordInput.parentElement.style.position = "relative";
        passwordInput.parentElement.appendChild(toggleButton);
    }

    async function getPosts() {
        try {
            const response = await fetch(`${baseUrl}/api/v1/stream`);
            if (!response.ok) throw new Error('Error al cargar los posts');
            
            const posts = await response.json();
            loadPosts(posts);
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    async function createPost() {
        const contentElement = document.getElementById("content");
        const content = contentElement.value.trim();
        
        try {
            validateForm({ content });
            
            const username = sessionStorage.getItem("username");
            const response = await fetch(`${baseUrl}/api/v1/stream`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({ username, content }),
            });

            if (!response.ok) throw new Error('Error al crear el post');
            
            const post = await response.json();
            addPostToStream(post);
            contentElement.value = "";
            
            // Actualizar contador de caracteres
            const counterElement = document.getElementById('char-counter');
            if (counterElement) {
                counterElement.textContent = "280 caracteres restantes";
                counterElement.classList.remove('text-red-500');
            }
            
            showNotification('Post publicado exitosamente');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    async function login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        try {
            validateForm({ username, password });
            
            const response = await fetch(`${baseUrl}/secured/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error('Credenciales inválidas');
            
            const data = await response.json();
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("token", data.token);
            
            showNotification('Inicio de sesión exitoso');
            setTimeout(() => {
                window.location.href = "stream.html";
            }, 1000);
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    function logout() {
        sessionStorage.clear();
        showNotification('Sesión cerrada exitosamente');
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }

    function checkAuthStatus() {
        const token = sessionStorage.getItem("token");
        if (!token) {
            window.location.href = "index.html";
        }
    }

    // Función para formatear fechas
    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = (now - date) / 1000; // diferencia en segundos

        if (diff < 60) return 'hace un momento';
        if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
        if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
        
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }

    return {
        init,
        initLogin,
        createPost,
        login,
        logout,
        formatDate
    };
})();