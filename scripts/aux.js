async function asyncFetch(url) {
    const objResponse = await fetch(url);
    if (!objResponse.ok) return new Error(`Error en fetch: status ${objResponse.status}`);
    return objResponse.json();
}

// Función que renderiza la barra de paginación
function renderPaginate(length, reset) {
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

    const paginateButtons = paginate.childNodes;
    if (reset) {
        // Este es el caso para cuando se cambia de tipo de proyecto
        paginateButtons[1].classList.add("btn-selected");
        paginateButtons[1].classList.remove("btn-hide")
        const pageSibling = paginateButtons[2];
        pageSibling.classList.remove("btn-hide")
        if (paginateButtons.length > 4) {
            pageSibling.insertAdjacentElement("afterend", createBotonElipsis("after"));
        }
        if (pageSibling && paginateButtons.length > 4) {
            pageSibling.classList.add("btn-adjacent");
        }
    } else if (selectedPage
        && paginateButtons[selectedPage.innerText]
        && selectedPage.innerText < paginateButtons.length - 1
    ) {
        // Aquí se colorean los botones adjacentes y si se puede se agregan los elipsis
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

// Función que renderiza el proyecto principal y los proyectos de la seccion de proyectos de desktop
function renderProyects(data) {
    const secDev = document.querySelector("#section-development");
    secDev.innerHTML = "";

    const primaryBtn = parseInt(document.querySelector(".btn-selected").innerText) - 1;

    const mainProyectSection = document.querySelector(".development-portrait-2");
    mainProyectSection.innerHTML = createProyect(data.proyectos[0], mainProyectSection.classList.value);
    const projectsStartIndex = primaryBtn * 3;
    for (let i = projectsStartIndex; i <= projectsStartIndex + 2 && i < data.proyectos.length; i++) {
        secDev.innerHTML += createProyect(data.proyectos[i], secDev.classList.value);
    }
}
