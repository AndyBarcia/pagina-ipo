const popup = document.getElementById("popup");
const form = document.querySelector("form");
const closeBtn = document.getElementById("close-popup");

function showPopup() {
    popup.style.display = "flex";

    // Permitir cerrar el Pop-Up haciendo click fuera del elemento.
    document.addEventListener("click", function (e) {
        if (e.target === popup) {
            closePopup();
        }
    });
}

function closePopup() {
    popup.style.display = "none";
    form.reset();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    showPopup();
});

closeBtn.addEventListener("click", function () {
    closePopup(); // Cerrar el Pop-Up al hacer clic en la "x"
});