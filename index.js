
const [, , metodo, recurso, ...args] = process.argv;

const [nombreRecurso, id] = recurso.split("/");

const BASE_URL = "https://fakestoreapi.com";

const request = async (url, options = {}) => {
    const respuesta = await fetch(url, options);

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    return await respuesta.json();
};

try {
    if (metodo === "GET") {
        if (id) {
            const producto = await request(`${BASE_URL}/${nombreRecurso}/${id}`);
            console.log(producto);
        } else {
            const productos = await request(`${BASE_URL}/${nombreRecurso}`);
            console.log(productos);
        }
    } else if (metodo === "POST") {
        const [titulo, precio, categoria] = args;

        if (!titulo || !precio || !categoria) {
            throw new Error("Faltan datos para crear el producto");
        }

        const nuevoProducto = {
            title: titulo,
            price: Number(precio),
            category: categoria
        };

        const productoCreado = await request(`${BASE_URL}/${nombreRecurso}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoProducto)
        });

        console.log(productoCreado);
    } else if (metodo === "DELETE") {
        if (!id) {
            throw new Error("Falta el ID del producto");
        }

        const productoEliminado = await request(
            `${BASE_URL}/${nombreRecurso}/${id}`,
            { method: "DELETE" }
        );

        console.log(productoEliminado);
    } else {
        throw new Error(`Método no reconocido: ${metodo}`);
    }
} catch (error) {
    console.log(error.message);
}
