// js/controller.js

//Elementos del DOM
const cardsContainer = document.getElementById("contenedor-peliculas");
const peliForn = document.getElementById("peliForms");
const peliFormModal = new bootstrap.Modal(document.getElementById('peliModal'));
let allPelis = [];

function rederCards(pelis){
    cardsContainer.innerHTML = '';
    if (pelis.length === 0) 
    {
        cardsContainer.innerHTML `<div class="col-12 text-center text-light p-5">
        <i class="bi bi-x-octagon-fill display-4 text-warning"></i>
        <h3 class="mt-3">No se encontraron películas</h3>
        <p>Crea uno nuevo para empezar</p>
        </div>`;
        return;
    }

    pelis.forEach(peli => {
        
    });
}

const peliculasData = [
  {
    id_pelicula: 1,
    titulo: "El Viaje de Chihiro",
    director: "Hayao Miyazaki",
    genero: "Animación, Fantasía",
    ano_estreno: 2001,
    duracion_min: 125,
  },
  {
    id_pelicula: 2,
    titulo: "Origen",
    director: "Christopher Nolan",
    genero: "Ciencia Ficción, Thriller",
    ano_estreno: 2010,
    duracion_min: 148,
  },
  {
    id_pelicula: 3,
    titulo: "Parasite",
    director: "Bong Joon-ho",
    genero: "Drama, Thriller",
    ano_estreno: 2019,
    duracion_min: 132,
  },
  {
    id_pelicula: 4,
    titulo: "Interstellar",
    director: "Christopher Nolan",
    genero: "Ciencia Ficción, Aventura",
    ano_estreno: 2014,
    duracion_min: 169,
  }
];
 
 
// --- FUNCIÓN PARA GENERAR LA TARJETA EN HTML CON BOOTSTRAP ---
function crearTarjetaPelicula(pelicula) {
    return `
        <div class="col">
            <div class="card h-100 shadow-sm" data-id="${pelicula.id_pelicula}">
                <div class="card-body d-flex flex-column">
                    
                    <h5 class="card-title d-flex justify-content-between align-items-center">
                        ${pelicula.titulo}
                        <span class="badge bg-secondary">${pelicula.ano_estreno}</span>
                    </h5>
 
                    <p class="card-text mb-2">
                        <strong>Director:</strong> ${pelicula.director}
                    </p>
                    
                    <p class="card-text">
                        <span class="badge bg-primary me-2">${pelicula.genero}</span>
                    </p>
 
                    <div class="mt-auto pt-3 border-top">
                        <small class="text-muted d-block mb-2">
                            Duración: ${pelicula.duracion_min} min
                        </small>
                        
                        <button class="btn btn-outline-info btn-sm w-100"
                                onclick="alert('Ver detalles de ${pelicula.titulo}, ID: ${pelicula.id_pelicula}')">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function abrirModalCreacion(){

}
 
 
// --- FUNCIÓN PRINCIPAL PARA INYECTAR EN EL DOM ---
function mostrarPeliculas(data) {
    const contenedor = document.getElementById('contenedor-peliculas');
    
    // Generamos un array de cadenas HTML
    const tarjetasHTML = data.map(pelicula => crearTarjetaPelicula(pelicula));
    
    // Inyectamos todo el HTML
    contenedor.innerHTML = tarjetasHTML.join('');
}
 
 
// Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    //'fetch()'
    // 'mostrarPeliculas(respuesta_api.json())'.
    mostrarPeliculas(peliculasData);
});

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('crear-btn');
    if (btn){
        btn.addEventListener('click', abrirModalCreacion);
    }
});