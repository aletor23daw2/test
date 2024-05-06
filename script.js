document.addEventListener("DOMContentLoaded", () => {
    const dropBox = document.getElementById("dropBox");
    const figures = document.querySelectorAll(".figure");
    const serieId = document.getElementById("serieId").value;
    let previousFigure = null;
    const initialPositions = new Map(); 
    const stack = [];
    const queue = [];

    figures.forEach(figure => {
        initialPositions.set(figure.id, {
            x: figure.getBoundingClientRect().left,
            y: figure.getBoundingClientRect().top,
            container: figure.parentNode,
        });
        figure.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", figure.id);
        });
    });

    dropBox.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    dropBox.addEventListener("drop", (event) => {
        event.preventDefault();
        const droppedFigureId = event.dataTransfer.getData("text/plain");
        const droppedFigure = document.getElementById(droppedFigureId);

        if (!droppedFigure) {
            console.error("La figura soltada no fue encontrada");
            return;
        }

        if (previousFigure && droppedFigure && droppedFigure.parentNode === dropBox) {
            previousFigure.style.left = initialPositions.get(previousFigure.id).x + "px";
            previousFigure.style.top = initialPositions.get(previousFigure.id).y + "px";
            initialPositions.get(previousFigure.id).container.appendChild(previousFigure);
            dropBox.appendChild(droppedFigure);
        } else {
            if (previousFigure && previousFigure.parentNode === dropBox) {
                previousFigure.style.left = initialPositions.get(previousFigure.id).x + "px";
                previousFigure.style.top = initialPositions.get(previousFigure.id).y + "px";
                initialPositions.get(previousFigure.id).container.appendChild(previousFigure);
            }
            dropBox.appendChild(droppedFigure);
        }

        previousFigure = droppedFigure;

        stack.unshift(droppedFigureId);
        queue.push(droppedFigureId);
    });

    dropBox.addEventListener("dragenter", (event) => {
        event.preventDefault();
        if (event.target.classList.contains("figure")) {
            event.target.classList.add("in-dropbox");
        }
    });

    dropBox.addEventListener("dragleave", (event) => {
        event.preventDefault();
        if (event.target.classList.contains("figure")) {
            event.target.classList.remove("in-dropbox");
        }
    });

    document.getElementById('checkButton').addEventListener('click', () => {
        const currentFigure = dropBox.children[0];
        if (currentFigure && currentFigure.id === `figure1`) {
            let currentScore = parseInt(localStorage.getItem('score') || '0'); 
            currentScore += 25; 
            localStorage.setItem('score', currentScore); 
            console.log("¡Correcto! Se han sumado 25 puntos. Puntuación actual:", currentScore);
        } else {
            console.log("Incorrecto");
        }

        const currentScoreValue = localStorage.getItem('score') || '0';
        localStorage.setItem('previousScore', currentScoreValue);

        window.location.href = `patron${parseInt(serieId.slice(-1)) + 1}.html`;
    });
});
