//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//Fucniones
cargarEventListener();

function cargarEventListener() {
    //Cuando agregas un curso precionando el boton "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursos en LocalStprae
    document.addEventListener('DOMContentLoaded', ()=>{
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
    })

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos
        carritoHTML();//Eliminamos HTML
    })
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }

}

//Eliminar cursos del carrito
function eliminarCurso(e) {

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarritos por el data-id
        articulosCarrito =  articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML()//volvemos a iterar

    }
}

//Leer el contenido  del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCursos(curso) {

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya esta en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id == infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son actualizados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
}

//muestra el carrito de compra en el HTML
function carritoHTML() {
    //limpiar el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}"  width="100" ></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}" > X </a> </td>
        `;

        //Agrega el HTML del carrito en el tableBody
        contenedorCarrito.appendChild(row);
    });
    //funcion de localStorage
    sincronizarCarrito(); 
}

function sincronizarCarrito(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

    function limpiarHTML() {
        // contenedorCarrito.innerHTML=``;
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }
