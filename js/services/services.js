// js/services/indexService.js
 
const API_URL = "http://localhost:8080/api"; // URL base del recurso
 
// --- Función de Utilidad (SweetAlert2) ---
export function showFeedback(title, message, icon) {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonColor: '#3085d6',
        timer: 3000,
        timerProgressBar: true
    });
}
 
// --- Funciones CRUD ---
export async function getAll() {
    try {
        const res = await fetch(`${API_URL}/peliculas/getPeliculas`, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error(`Error al obtener las películas: ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error('Fallo getAll:', error);
        showFeedback("Error de Carga", "No se pudieron cargar las películas desde la API.", 'error');
        throw error;
    }
}
 
export async function create(payload) {
    try {
        const res = await fetch(`${API_URL}/peliculas/postPelicula`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Error al crear ls película.');
        showFeedback("¡Éxito!", "Película creada y añadida con éxito.", 'success');
    } catch (error) {
        console.error('Fallo create:', error);
        showFeedback("Error", "No se pudo crear el la película.", 'error');
        throw error;
    }
}
 
export async function update(id, payload) {
    try {
        const res = await fetch(`${API_URL}/peliculas/updatePelicula/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Error al actualizar la película.');
        showFeedback("¡Éxito!", "Película actualizada con éxito.", 'success');
    } catch (error) {
        console.error('Fallo update:', error);
        showFeedback("Error", "No se pudo actualizar la película.", 'error');
        throw error;
    }
}
 
export async function deleteA(id) {
    try {
        const res = await fetch(`${API_URL}/peliculas/deletePelicula/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error('Error al eliminar la película.');
        showFeedback("¡Eliminado!", "La película ha sido borrada.", 'success');
    } catch (error) {
        console.error('Fallo delete:', error);
        showFeedback("Error", "No se pudo eliminar la pélicula.", 'error');
        throw error;
    }
}