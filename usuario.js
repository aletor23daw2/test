export class Usuario {
    constructor(username) {
        this.username = username;
    }

    guardarUsernameYRedirigir() {
        localStorage.setItem("username", this.username);
        const puntuacion = localStorage.getItem("score") || "0";
        window.location.href = "patron1.html";
    }
}

const initializeUserForm = () => {
    const userForm = document.getElementById("userForm");
    const usernameInput = document.getElementById("username");

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();

        if (username) {
            const usuario = new Usuario(username);
            usuario.guardarUsernameYRedirigir();
        }
    });
};

document.addEventListener("DOMContentLoaded", initializeUserForm);
