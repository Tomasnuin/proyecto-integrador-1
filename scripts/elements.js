/**
 * Este archivo contiene funciones que devuelven objetos HTML, es solo para que main.js sea mas facil de leer
 */

const crearBotonPrev = function () {
    const btn = document.createElement("button");
    btn.id = "btn-prev";
    btn.classList.add("btn");
    btn.innerHTML = `<svg id="prev" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 16.8596L16.227 18L0 9L16.227 0L18 1.14043L3.8295 9L18 16.8596Z" fill="#4F4F4F" /></svg>`;
    return btn;
}

const crearBotonNext = function () {
    const btn = document.createElement("button");
    btn.id = "btn-next";
    btn.classList.add("btn");
    btn.innerHTML = `<svg id="next" width="18" height="18" viewBox="0 0 18 18" fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M0 1.14043L1.773 0L18 9L1.773 18L0 16.8596L14.1705 9L0 1.14043Z" fill="#4F4F4F" /></svg>`;
    return btn;
}

const createBotonElipsis = function (id) {
    const btnElipsis = document.createElement("button");
    btnElipsis.classList.value = `btn btn-ellipsis ellipsis-${id}`;
    const dot = `<svg class="dot" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circle-${id}" cx="4" cy="4" r="4" fill="#4F4F4F" /></svg>`;
    btnElipsis.innerHTML = `${dot}${dot}${dot}`;
    return btnElipsis;
}

const createProyect = function (proyecto, parent) {
    // Un if else es suficiente para este caso en especifico
    if (parent.includes("development-portrait-2")) {
        return `<div class="development-frame">
            <img class="project-image"
                src="${proyecto.img}"
                alt="Example project image">    
            <div class="project-info">
                <div class="project-tags-title">
                    <p class="project-tags">${proyecto.etiquetas}</p>
                    <h2 class="project-title">${proyecto.titulo}</h2>
                </div>
                <p class="project-description">
                    ${proyecto.descripcion}
                </p>
                <div class="project-buttons">
                    <button value="${proyecto.demo}" class="button-demo">Demo</button>
                    <button value="${proyecto.code}" class="button-code">Code</button>
                </div>
            </div>
        </div>`;
    } else {
        return `<section class="mobile-view desktop-view development-portrait">
        <div class="development-frame-portrait">
            <img class="project-image"
                src="${proyecto.img}"
                alt="Example project image">
            <div class="project-info">
                <div class="project-tags-title">
                    <p class="project-tags">${proyecto.etiquetas}</p>
                    <h2 class="project-title">${proyecto.titulo}</h2>
                </div>
                <p class="project-description">
                    ${proyecto.descripcion}
                </p>
                <div class="project-buttons">
                    <button value="${proyecto.demo}" class="button-demo">Demo</button>
                    <button value="${proyecto.code}" class="button-code">Code</button>
                </div>
            </div>
        </div>
    </section>`;
    }
}

const createExperience = function (experience) {
    return `<section class="experience-info experience-hide">
        <div class="experience-header">
            ${experience.icono}
            <div class="experience-job-title-duration">
                <p class="experience-job-duration">${experience.fecha}</p>
                <h2 class="experience-job-title">${experience.titulo}</h2>
            </div>
        </div>
        <p class="experience-job-description">${experience.descripcion}</p>
    </section>`;
}

const createCertificate = function (certificate) {
    return `<section class="certificates-info certificates-hide">
                <img class="certificates-image"
                    src="${certificate.img}"
                    alt="Certificado de front-end">
                <div class="certificates-header">
                    <h2 class="certificates-description">${certificate.titulo}</h2>
                    <p class="certificates-duration">${certificate.fecha}</p>
                </div>
            </section>`;
}