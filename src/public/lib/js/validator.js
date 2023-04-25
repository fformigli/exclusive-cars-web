// Obtener el formulario y los campos requeridos
const form = document.querySelector('form');
const requiredFields = form.querySelectorAll('[required]');

// Agregar un controlador de eventos para cuando se envía el formulario
form.addEventListener('submit', (event) => {
    // Inicializar una variable para rastrear si todos los campos están completos
    let allFieldsCompleted = true;

    // Verificar si cada campo requerido tiene un valor
    requiredFields.forEach((field) => {
        if (!field.value) {
            // Si el campo está vacío, marcar como incompleto y agregar una clase CSS de "error"
            allFieldsCompleted = false;
            field.classList.add('error');
        } else {
            // Si el campo tiene un valor, asegurarse de que no tenga la clase CSS "error"
            field.classList.remove('error');
        }
    });

    // Si no se han completado todos los campos, evitar que se envíe el formulario
    if (!allFieldsCompleted) {
        event.preventDefault();
    }
});
