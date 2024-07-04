// Se agrega un evento 'submit' al formulario con el id 'clienteForm'
document.getElementById('clienteForm').addEventListener('submit', function(event) {
    // Se previene el comportamiento por defecto del formulario, que es recargar la página
    event.preventDefault();

    // Se obtienen los valores de los campos del formulario
    const cedula = document.getElementById('cedula').value;
    const apellidos = document.getElementById('apellidos').value;
    const nombres = document.getElementById('nombres').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    // Validaciones de los campos del formulario
    if (!/^\d{10}$/.test(cedula)) {
        alert('Cédula no válida');
        return;
    }
    if (!/^\d{10}$/.test(telefono)) {
        alert('Teléfono no válido');
        return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
        alert('Correo no válido');
        return;
    }

    // Se crea un objeto cliente con los valores del formulario
    const cliente = {
        cedula,
        apellidos,
        nombres,
        direccion,
        telefono,
        correo
    };

    // Se obtiene la lista de clientes del localStorage, si no existe se inicializa como un array vacío
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    // Se agrega el nuevo cliente a la lista de clientes
    clientes.push(cliente);
    // Se guarda la lista de clientes actualizada en el localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes));

    // Se llama a la función mostrarClientes para actualizar la lista mostrada en la página
    mostrarClientes();
    // Se reinicia el formulario
    this.reset();
});

// Función para mostrar la lista de clientes en la página
function mostrarClientes() {
    // Se obtiene el elemento ul donde se mostrarán los clientes
    const clientesUl = document.getElementById('clientesUl');
    // Se limpia el contenido actual del elemento ul
    clientesUl.innerHTML = '';
    // Se obtiene la lista de clientes del localStorage
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    // Se recorre la lista de clientes y se crea un elemento li para cada cliente
    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Cédula:</strong> ${cliente.cedula} <br>
            <strong>Apellidos:</strong> ${cliente.apellidos} <br>
            <strong>Nombres:</strong> ${cliente.nombres} <br>
            <strong>Dirección:</strong> ${cliente.direccion} <br>
            <strong>Teléfono:</strong> ${cliente.telefono} <br>
            <strong>Correo Electrónico:</strong> ${cliente.correo}
        `;
        // Se agrega el elemento li al elemento ul
        clientesUl.appendChild(li);
    });
}

// Se agrega un evento 'DOMContentLoaded' al documento para que al cargar la página se llame a la función mostrarClientes
document.addEventListener('DOMContentLoaded', mostrarClientes);
