function crearBotonPrev() {
    const btn = document.createElement("button");
    btn.id = "btn-prev";
    btn.classList.add("btn");
    btn.innerHTML = `<svg id="prev" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 16.8596L16.227 18L0 9L16.227 0L18 1.14043L3.8295 9L18 16.8596Z" fill="#4F4F4F" /></svg>`;
    return btn;
}

function crearBotonNext() {
    const btn = document.createElement("button");
    btn.id = "btn-next";
    btn.classList.add("btn");
    btn.innerHTML = `<svg id="next" width="18" height="18" viewBox="0 0 18 18" fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M0 1.14043L1.773 0L18 9L1.773 18L0 16.8596L14.1705 9L0 1.14043Z" fill="#4F4F4F" /></svg>`;
    return btn;
}

function createBotonElipsis(id) {
    const btnElipsis = document.createElement("button");
    btnElipsis.classList.value = `btn btn-ellipsis ellipsis-${id}`;
    const dot = `<svg class="dot" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circle-${id}" cx="4" cy="4" r="4" fill="#4F4F4F" /></svg>`;
    btnElipsis.innerHTML = `${dot}${dot}${dot}`;
    return btnElipsis;
}