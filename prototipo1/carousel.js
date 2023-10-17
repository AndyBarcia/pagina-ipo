// Actualiza el estilo y posicionamiento de los elementos de un carousel
// en base a su número y ancho de las cartas (pasado como atributo).
const actualizar_carousel = (id) => {
    const carousel = document.querySelector(id);
    const card_number = carousel.children.length;
    const delta_angle = 360 / card_number;

    const card_width = parseInt(carousel.dataset.width);
    const card_radius = card_width / (2 * Math.sin(Math.PI / card_number));
    const card_distance = card_radius * Math.cos(Math.PI / card_number);

    for (const [i, card] of [...carousel.children].entries()) {
        const rotation = (delta_angle * i);
        card.style.transform = `rotateY(${rotation}deg) translateZ(${card_distance}px)`;
    }
}

// Inicializar los controladores de todos los carousels. Cada controlador puede controlar
// un carousel específico indicado por su atributo "data-target".
document.querySelectorAll('.carousel-controller').forEach((controller) => {
    const target_carousel = document.querySelector('#' + controller.dataset.target);
    let rotation = 0;
    // Botón izquierdo
    controller.children[0].onclick = () => {
        let delta_rotation = 360 / (target_carousel.children.length);
        rotation += delta_rotation;
        target_carousel.style.transform = `rotate3d(0, 1, 0, ${rotation}deg)`
    }
    // Botón derecho
    controller.children[1].onclick = () => {
        let delta_rotation = 360 / (target_carousel.children.length);
        rotation -= delta_rotation;
        target_carousel.style.transform = `rotate3d(0, 1, 0, ${rotation}deg)`
    }
});

window.onload = (_) => {
    actualizar_carousel("#carousel-comentarios");
}