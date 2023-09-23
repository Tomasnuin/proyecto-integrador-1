// Lo primero que quiero hacer es mostrar la info de responsive en la base de datos
// Despues agregar la interaccion con los botones
// Despues cambiarlo para que al clickear traiga la info de lo que corresponda
// si no es muy intenso en el uso de la memoria traigo todo para mostrarlo mas rapido
// Hacer profiling y evaluar que optimizaciones tengo que hacer

async function asyncFetch(url) {

    const objResponse = await fetch(url);

    if (!objResponse.ok) return new Error(`Error en fetch: status ${objResponse.status}`);

    return objResponse.json();
}

(async () => {
    try {
        const data = await asyncFetch("https://my-json-server.typicode.com/Tomasnuin/proyecto-integrador-1/Responsivo");

        if (data instanceof Error) throw data;
        const titulo = document.querySelectorAll(".project-title");
        console.log(titulo);
        for (let index = 0; index < titulo.length; index++) {
            titulo[index].innerHTML = data[index].Titulo;

        }
    } catch (error) {
        console.log(error);
    }
})()
