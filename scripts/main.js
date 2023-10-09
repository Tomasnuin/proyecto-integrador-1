// Uso esta función para renderizar la barra de paginación y los proyectos con un solo fetch
async function fetchAndRender(resetPaginationBar) {
    try {
        const proyectType = document.querySelector(".primary-button").innerText.toLowerCase();

        const data = await asyncFetch(`https://6513692e8e505cebc2e9d111.mockapi.io/api/portfolio/proyectos/${proyectType}`);

        if (data instanceof Error) throw data;

        renderPaginate(data.proyectos.length, resetPaginationBar);
        renderProyects(data);
    } catch (error) {
        console.log(error);
    }
}

// IIFE que renderiza certificados y experiencias
(async function () {
    try {
        const seccionCertificados = document.querySelector("#certificates-frame");
        const seccionExperiencias = document.querySelector(".experience-body");

        const data = await asyncFetch(`https://6513692e8e505cebc2e9d111.mockapi.io/api/portfolio/experiencia-certificados`);

        if (data instanceof Error) throw data;

        const certificados = data[0]["certificados"];
        const experiencias = data[1]["experiencias"];

        for (let i = 0; i < experiencias.length; i++) {
            seccionExperiencias.innerHTML += createExperience(experiencias[i]);
        }
        seccionExperiencias.firstElementChild.classList.remove("experience-hide");

        for (let i = 0; i < certificados.length; i++) {
            seccionCertificados.innerHTML += createCertificate(certificados[i]);
        }
        seccionCertificados.firstElementChild.classList.remove("certificates-hide");

        fetchAndRender();
    } catch (error) {
        console.log(error);
    }
})();

const body = document.querySelector("body");
body.addEventListener("click", (e) => {
    const { target: { classList }, target: { id } } = e;

    // Caso en el que se haga click a un boton de tipo de proyecto que no sea el que ya estaba seleccionado
    if (classList.value.includes("secondary-button") && !id && !classList.value.includes("btn-prev")) {
        const primaryBtn = document.querySelector(".primary-button");
        primaryBtn.classList.add("secondary-button");
        primaryBtn.classList.remove("primary-button");

        classList.add("primary-button");
        classList.remove("secondary-button");

        fetchAndRender(true);
        return;
    }

    if ((id === "btn-prev" || id === "prev") && selectedPage.innerText > 1) {
        const btnAdj = document.querySelectorAll(".btn-adjacent");
        btnAdj.forEach(e => { e.classList.remove("btn-adjacent"); });
        if (!selectedPage.previousSibling.id) {
            selectedPage.classList.remove("btn-selected");
            selectedPage.previousSibling.classList.add("btn-selected");
        }

        fetchAndRender();

        return;
    }

    const selectedPage = document.querySelector(".btn-selected");
    // Por que puedo acceder a la constante "paginate"?
    if ((id === "btn-next" || id === "next") && parseInt(selectedPage.innerText) < paginate.childNodes[paginate.childNodes.length - 2].innerText) {
        const btnAdj = document.querySelectorAll(".btn-adjacent");
        btnAdj.forEach(e => { e.classList.remove("btn-adjacent"); });
        // Este es el caso en que el boton siguiente al que esta seleccionado es el boton de avanzar a la siguiente pagina (>)
        if (!selectedPage.nextSibling.id) {
            selectedPage.classList.remove("btn-selected");
            selectedPage.nextSibling.classList.add("btn-selected");
        }
        fetchAndRender();

        return;
    }

    if (classList.value.search(/(ellipsis-before|circle-before)/) >= 0) {
        const btnAdj = document.querySelectorAll(".btn-adjacent");
        btnAdj.forEach(e => { e.classList.remove("btn-adjacent"); });
        // Este es el caso en que el boton anterior al que esta seleccionado es el boton de pagina anterior (<)
        if (!selectedPage.previousSibling.id) {
            selectedPage.classList.remove("btn-selected");
            // este seria elemento anterior al elipsis
            selectedPage.previousSibling.previousSibling.previousSibling.classList.add("btn-selected");
        }

        fetchAndRender();
        return;
    }

    if (classList.value.search(/(ellipsis-after|circle-after)/) >= 0) {
        const btnAdj = document.querySelectorAll(".btn-adjacent");
        btnAdj.forEach(e => { e.classList.remove("btn-adjacent"); });
        // Este es el caso en que el boton siguiente al que esta seleccionado es el boton de avanzar a la siguiente pagina (>)
        if (!selectedPage.nextSibling.id) {
            selectedPage.classList.remove("btn-selected");
            // este seria el siguiente elemento despues del elipsis
            selectedPage.nextSibling.nextSibling.nextSibling.classList.add("btn-selected");
        }

        fetchAndRender();
        return;
    }

    // Caso en el que le hago click a un botón de página de la barra de paginado
    if (classList.value.includes("btn")) {
        if (!classList.value.includes("btn-selected") && !id) {
            selectedPage.classList.remove("btn-selected");
            selectedPage.nextSibling.classList.remove("btn-adjacent");

            classList.add("btn-selected");
            fetchAndRender();
            return;
        }
    }

    if (classList.value.includes("button-demo")) {
        window.alert(e.target.attributes["value"].value);
    }

    if (classList.value.includes("button-code")) {
        window.alert(e.target.attributes["value"].value);
    }

})