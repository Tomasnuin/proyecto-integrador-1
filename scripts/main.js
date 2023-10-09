async function asyncFetch(url) {
    const objResponse = await fetch(url);
    if (!objResponse.ok) return new Error(`Error en fetch: status ${objResponse.status}`);
    return objResponse.json();
}

function renderPaginate(length) {
    const paginate = document.querySelector("#paginate");
    const selectedPage = document.querySelector(".btn-selected");
    paginate.innerHTML = "";

    // Agregar boton de página anterior
    const prevBtn = crearBotonPrev();
    paginate.appendChild(prevBtn);

    // Agregar botones para cada pagina
    const totalPages = Math.ceil(length / 3);
    for (let page = 1; page <= totalPages; page++) {
        const pageBtn = document.createElement("button");

        pageBtn.classList.add("btn");
        if (page > 1 && page < totalPages) {
            pageBtn.classList.add("btn-hide");
        }
        pageBtn.innerText = page;
        paginate.appendChild(pageBtn);
    }

    // Agregar boton de página siguiente
    const nextBtn = crearBotonNext();
    paginate.appendChild(nextBtn);

    // Ahora 
    const paginateButtons = paginate.childNodes;
    if (selectedPage
        && paginateButtons[selectedPage.innerText]
        && selectedPage.innerText < paginateButtons.length - 1
    ) {
        const selectedPageNum = parseInt(selectedPage.innerText);
        paginateButtons[selectedPageNum].classList.add("btn-selected");
        paginateButtons[selectedPageNum].classList.remove("btn-hide");

        const pageNextSibling = paginateButtons[selectedPageNum + 1];
        if (pageNextSibling && (selectedPageNum + 1) < paginateButtons.length - 2) {
            pageNextSibling.classList.add("btn-adjacent");
            pageNextSibling.classList.remove("btn-hide");
            if (selectedPageNum + 1 < paginateButtons.length - 3) {
                pageNextSibling.insertAdjacentElement("afterend", createBotonElipsis("after"));
            }
        }

        const pagePrevSibling = paginateButtons[parseInt(selectedPage.innerText) - 1];
        if (pagePrevSibling && (selectedPageNum + 1) > 3) {
            pagePrevSibling.classList.add("btn-adjacent");
            pagePrevSibling.classList.remove("btn-hide");
            if (selectedPageNum + 1 > 4) {
                pagePrevSibling.insertAdjacentElement("beforebegin", createBotonElipsis("before"));
            }
        }
    } else {
        // Este es el caso para la página principal, y tambien en caso de que el número de página no este en el tipo de proyecto
        paginateButtons[2].classList.add("btn-selected");
        paginateButtons[2].classList.remove("btn-hide")
        const pageSibling = paginateButtons[3];
        pageSibling.classList.remove("btn-hide")
        if (paginateButtons.length > 4) {
            pageSibling.insertAdjacentElement("afterend", createBotonElipsis("after"));
        }
        if (pageSibling && paginateButtons.length > 5) {
            pageSibling.classList.add("btn-adjacent");
        }
    }
}

function renderProyects(data) {
    const secDev = document.querySelector("#section-development");
    secDev.innerHTML = "";

    const primaryBtn = parseInt(document.querySelector(".btn-selected").innerText) - 1;

    const mainProyectSection = document.querySelector(".development-portrait-2");
    mainProyectSection.innerHTML =
        `<div class="development-frame">
                <img class="project-image"
                    src="${data.proyectos[0].img}"
                    alt="Example project image">    
                <div class="project-info">
                    <div class="project-tags-title">
                        <p class="project-tags">${data.proyectos[0].etiquetas}</p>
                        <h2 class="project-title">${data.proyectos[0].titulo}</h2>
                    </div>
                    <p class="project-description">
                        ${data.proyectos[0].descripcion}
                    </p>
                    <div class="project-buttons">
                        <button value="${data.proyectos[0].demo}" class="button-demo">Demo</button>
                        <button value="${data.proyectos[0].code}" class="button-code">Code</button>
                    </div>
                </div>
            </div>`;

    const projectsStartIndex = primaryBtn * 3;

    for (let i = projectsStartIndex; i <= projectsStartIndex + 2 && i < data.proyectos.length; i++) {
        secDev.innerHTML += `
            <section class="mobile-view desktop-view development-portrait">
                <div class="development-frame-portrait">
                    <img class="project-image"
                        src="${data.proyectos[i].img}"
                        alt="Example project image">
                    <div class="project-info">
                        <div class="project-tags-title">
                            <p class="project-tags">${data.proyectos[i].etiquetas}</p>
                            <h2 class="project-title">${data.proyectos[i].titulo}</h2>
                        </div>
                        <p class="project-description">
                            ${data.proyectos[i].descripcion}
                        </p>
                        <div class="project-buttons">
                            <button value="${data.proyectos[i].demo}" class="button-demo">Demo</button>
                            <button value="${data.proyectos[i].code}" class="button-code">Code</button>
                        </div>
                    </div>
                </div>
            </section>`;
    }
}

async function fetchAndRender() {
    try {
        const proyectType = document.querySelector(".primary-button").innerText.toLowerCase();

        const data = await asyncFetch(`https://6513692e8e505cebc2e9d111.mockapi.io/api/portfolio/proyectos/${proyectType}`);

        if (data instanceof Error) throw data;

        renderPaginate(data.proyectos.length);
        renderProyects(data)
    } catch (error) {
        console.log(error);
    }
}

(async function () {
    try {
        const seccionCertificados = document.querySelector("#certificates-frame");
        const seccionExperiencias = document.querySelector(".experience-body");

        const data = await asyncFetch(`https://6513692e8e505cebc2e9d111.mockapi.io/api/portfolio/experiencia-certificados`);

        if (data instanceof Error) throw data;

        const certificados = data[0]["certificados"];
        const experiencias = data[1]["experiencias"];

        for (let i = 0; i < experiencias.length; i++) {
            seccionExperiencias.innerHTML +=
                `<section class="experience-info experience-hide">
            <div class="experience-header">
                ${experiencias[i].icono}
                <div class="experience-job-title-duration">
                    <p class="experience-job-duration">${experiencias[i].fecha}</p>
                    <h2 class="experience-job-title">${experiencias[i].titulo}</h2>
                </div>
            </div>
            <p class="experience-job-description">${experiencias[i].descripcion}</p>
        </section>`;
        }
        seccionExperiencias.firstElementChild.classList.remove("experience-hide");

        for (let i = 0; i < certificados.length; i++) {
            seccionCertificados.innerHTML += `
        <section class="certificates-info certificates-hide">
            <img class="certificates-image"
                src="${certificados[i].img}"
                alt="Certificado de front-end">
            <div class="certificates-header">
                <h2 class="certificates-description">${certificados[i].titulo}</h2>
                <p class="certificates-duration">${certificados[i].fecha}</p>
            </div>
        </section>`;
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

    if (classList.value.includes("secondary-button") && !id && !classList.value.includes("btn-prev")) {
        const primaryBtn = document.querySelector(".primary-button");
        primaryBtn.classList.add("secondary-button");
        primaryBtn.classList.remove("primary-button");

        classList.add("primary-button");
        classList.remove("secondary-button");

        fetchAndRender();
        return;
    }

    const selectedPage = document.querySelector(".btn-selected");
    if (classList.value.includes("btn")
        && !(classList.value.includes("ellipsis-before")
            || classList.value.includes("ellipsis-after"))
    ) {
        if (!classList.value.includes("btn-selected") && !id) {
            selectedPage.classList.remove("btn-selected");
            selectedPage.nextSibling.classList.remove("btn-adjacent");

            classList.add("btn-selected");
            fetchAndRender();
            return;
        }
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

    // Porque puedo acceder a la constante "paginate"?
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

    if (classList.value.includes("button-demo")) {
        window.alert(e.target.attributes["value"].value);
    }

    if (classList.value.includes("button-code")) {
        window.alert(e.target.attributes["value"].value);
    }

})