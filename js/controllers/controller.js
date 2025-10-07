// js/controller.js 

// Importar todas las funciones del servicio
import * as peliService from '../services/services.js';

// --- CONFIGURACIÓN Y ELEMENTOS DEL DOM ---
const cardsContainer = document.getElementById("contenedor-peliculas");
const peliForm = document.getElementById("peliForm"); // ID del formulario
const peliModalEl = document.getElementById('peliModal'); // ID del modal
const peliModal = new bootstrap.Modal(peliModalEl);
const modalTitle = document.getElementById('peliModalLabel');
const crearBtn = document.getElementById('crear-btn');

let allPelis = []; // Almacena todas las películas cargadas

// --- LÓGICA DE CARGA DE DATOS Y CRUD ---
async function fetchPeliculas() {
    try {
        const data = await peliService.getAll();
        allPelis = data || [];
        rederCards(allPelis);
    } catch (error) {
        console.error("Fallo al cargar películas:", error);
    }
}

/** Prepara y envía los datos para crear o editar. */
async function handleSubmit(event) {
    event.preventDefault();

    // 1. Capturar datos del formulario
    const peliId = document.getElementById('peliId').value; // ID oculto
    const payload = {
        // Mapear IDs de campos a nombres de columnas de la base de datos
        titulo: document.getElementById('titulo').value,
        director: document.getElementById('director').value,
        genero: document.getElementById('genero').value,
        anoEstreno: parseInt(document.getElementById('estreno').value), // Conversión
        duracionMin: parseInt(document.getElementById('duracion').value), // Conversión
    };

    try {
        if (peliId) {
            // EDICIÓN (UPDATE)
            await peliService.update(peliId, payload);
        } else {
            // CREACIÓN (CREATE)
            await peliService.create(payload);
        }
        peliModal.hide();
        await fetchPeliculas();

    } catch (error) {
        console.error("Fallo en handleSubmit:", error);
    }
}

/** Abre SweetAlert para confirmar la eliminación. */
function handleDeleteClick(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡La película será eliminada permanentemente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545', // Color Danger
        cancelButtonColor: '#1a75ff',  // Color Secondary
        confirmButtonText: 'Sí, ¡bórralo!',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await peliService.deleteA(id);
                await fetchPeliculas();
            } catch (error) {
                console.error("Fallo al eliminar:", error);
            }
        }
    });
}

function abrirModalCreacion() {
    modalTitle.textContent = 'Crear nueva Película';
    peliForm.reset();
    document.getElementById('peliId').value = ''; // ID del campo oculto
    peliModal.show();
}

function abrirModalEdicion(id) {
    const pelicula = allPelis.find(p => p.id === id);

    if (!pelicula) {
        peliService.showFeedback("Error", "Película no encontrada para editar.", 'error');
        return;
    }

    modalTitle.textContent = `Editar Película: ${pelicula.titulo}`;

    // Rellena el formulario: Mapear datos de la API a IDs del formulario
    document.getElementById('peliId').value = pelicula.id;
    document.getElementById('titulo').value = pelicula.titulo;
    document.getElementById('director').value = pelicula.director;
    document.getElementById('genero').value = pelicula.genero;
    document.getElementById('estreno').value = pelicula.anoEstreno;
    document.getElementById('duracion').value = pelicula.duracionMin;

    peliModal.show();
}


function crearTarjetaPelicula(pelicula) {
    const id = pelicula.id;

    return `
        <div class="col mb-4">
            <div class="card h-100 shadow-sm bg-light text-dark" data-id="${id}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title d-flex justify-content-between align-items-center">
                        ${pelicula.titulo} 
                        <span class="badge bg-secondary">${pelicula.anoEstreno}</span>
                    </h5>
                    <p class="card-text mb-2">
                        <strong>Director:</strong> ${pelicula.director}
                    </p>
                    <p class="card-text">
                        <span class="badge bg-primary me-2">${pelicula.genero}</span>
                    </p>
                    
                    <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            Duración: ${pelicula.duracionMin} min
                        </small>
                        
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-warning" title="Editar"
                                    onclick="window.abrirModalEdicion(${id})">
                                <i class="bi bi-pencil-square"></i> 
                            </button>
                            <button class="btn btn-sm btn-danger" title="Eliminar"
                                    onclick="window.handleDeleteClick(${id})">
                                <i class="bi bi-trash"></i> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function rederCards(pelis) {
    cardsContainer.innerHTML = '';

    if (!pelis || pelis.length === 0) {
        cardsContainer.innerHTML = `
            <div class="col-12 text-center text-light p-5"> 
                <i class="bi bi-x-octagon-fill display-4 text-warning"></i> 
                <h3 class="mt-3">No se encontraron películas</h3> 
                <p>Crea una nueva para empezar</p> 
            </div>`;
        return;
    }

    const tarjetasHTML = pelis.map(peli => crearTarjetaPelicula(peli));
    cardsContainer.innerHTML = tarjetasHTML.join('');
}


document.addEventListener('DOMContentLoaded', () => {
    fetchPeliculas();

    if (crearBtn) {
        crearBtn.addEventListener('click', abrirModalCreacion);
    }

    peliForm.addEventListener('submit', handleSubmit);

    window.abrirModalEdicion = abrirModalEdicion;
    window.handleDeleteClick = handleDeleteClick;
});