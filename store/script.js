
// Datos de los productos
const productos = [
    { nombre: 'VUE', precio: 15.00, imagen: 'img/1.jpg' },
    { nombre: 'ANGULAR', precio: 15.00, imagen: 'img/2.jpg' },
    { nombre: 'REACT', precio: 15.00, imagen: 'img/3.jpg' },
    { nombre: 'REDUX', precio: 15.00, imagen: 'img/4.jpg' },
    { nombre: 'NODE', precio: 15.00, imagen: 'img/5.jpg' },
    { nombre: 'SASS', precio: 15.00, imagen: 'img/6.jpg' },
    { nombre: 'HTML5', precio: 15.00, imagen: 'img/7.jpg' },
    { nombre: 'GITHUB', precio: 15.00, imagen: 'img/8.jpg' },
    { nombre: 'BULMA', precio: 15.00, imagen: 'img/9.jpg' },
    { nombre: 'TYPESCRIPT', precio: 15.00, imagen: 'img/10.jpg' },
    { nombre: 'DRUPAL', precio: 15.00, imagen: 'img/11.jpg' },
    { nombre: 'JAVASCRIPT', precio: 15.00, imagen: 'img/12.jpg' }
];

async function cargarProducto(nombre, descripcion, precio, imagen) {
    const producto = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen
    };

    // Almacena los datos del producto en localStorage
    localStorage.setItem('producto', JSON.stringify(producto));

    // Redirige a la página de compra
    window.location.href = 'compra.html'; 
}
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('productos.html')) {
        const container = document.querySelector('.productos-container');
        
        if (!container) {
            console.error("No se encontró el contenedor .productos-container");
            return;
        }

        productos.forEach(producto => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4 mb-4';

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.className = 'card-img-top';
            img.alt = producto.nombre;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const cardTitle = document.createElement('h4');
            cardTitle.className = 'card-title';
            cardTitle.textContent = producto.nombre;

            const cardText = document.createElement('h3');
            cardText.className = 'card-text';
            cardText.textContent = `${producto.precio.toFixed(2)} €`;

            const btn = document.createElement('a');
            btn.href = '#';
            btn.className = 'btn btn-primary';
            btn.textContent = 'Comprar';
            btn.onclick = function() {
                cargarProducto(producto.nombre, 'Descripción del producto', producto.precio.toFixed(2), producto.imagen);
            };

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(btn);

            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);

            colDiv.appendChild(cardDiv);

            container.appendChild(colDiv);
        });
    } else if (window.location.pathname.endsWith('compra.html')) {
        const producto = JSON.parse(localStorage.getItem('producto'));
        if (producto) {
            const infoDiv = document.getElementById('producto-info');
            
            if (!infoDiv) {
                console.error("No se encontró el contenedor #producto-info");
                return;
            }

            const row = document.createElement('div');
            row.className = 'row justify-content-center';

            const colAuto = document.createElement('div');
            colAuto.className = 'col-auto';

            const rowNoGutters = document.createElement('div');
            rowNoGutters.className = 'row no-gutters';

            const colImg = document.createElement('div');
            colImg.className = 'col-auto';

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;
            img.className = 'img-fluid';
            img.style.objectFit = 'contain';
            img.style.maxHeight = '300px';

            colImg.appendChild(img);

            const colContent = document.createElement('div');
            colContent.className = 'col-auto d-flex flex-column justify-content-center';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body p-2';

            const cardTitle = document.createElement('h4');
            cardTitle.className = 'card-title mb-1';
            cardTitle.textContent = producto.nombre;

            const cardText = document.createElement('h3');
            cardText.className = 'card-text mb-1';
            cardText.textContent = `${producto.precio} €`;

            const formGroupTalla = document.createElement('div');
            formGroupTalla.className = 'form-group mb-1';
            const labelTalla = document.createElement('label');
            labelTalla.setAttribute('for', 'talla');
            labelTalla.textContent = 'Seleccionar Talla:';
            const selectTalla = document.createElement('select');
            selectTalla.id = 'talla';
            selectTalla.className = 'form-control form-control-sm';
            selectTalla.style.maxWidth = '150px';
            ['S', 'M', 'L', 'XL'].forEach(talla => {
                const option = document.createElement('option');
                option.value = talla;
                option.textContent = talla;
                selectTalla.appendChild(option);
            });
            formGroupTalla.appendChild(labelTalla);
            formGroupTalla.appendChild(selectTalla);

            const formGroupCantidad = document.createElement('div');
            formGroupCantidad.className = 'form-group mb-1';
            const labelCantidad = document.createElement('label');
            labelCantidad.setAttribute('for', 'cantidad');
            labelCantidad.textContent = 'Cantidad:';
            const inputCantidad = document.createElement('input');
            inputCantidad.id = 'cantidad';
            inputCantidad.className = 'form-control form-control-sm';
            inputCantidad.setAttribute('type', 'number');
            inputCantidad.setAttribute('value', '1');
            inputCantidad.setAttribute('min', '1');
            inputCantidad.style.maxWidth = '150px';
            formGroupCantidad.appendChild(labelCantidad);
            formGroupCantidad.appendChild(inputCantidad);

            const btnConfirmar = document.createElement('button');
            btnConfirmar.className = 'btn btn-success mt-4';
            btnConfirmar.textContent = 'Confirmar Compra';

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(formGroupTalla);
            cardBody.appendChild(formGroupCantidad);
            cardBody.appendChild(btnConfirmar);

            colContent.appendChild(cardBody);

            rowNoGutters.appendChild(colImg);
            rowNoGutters.appendChild(colContent);

            colAuto.appendChild(rowNoGutters);

            row.appendChild(colAuto);

            infoDiv.appendChild(row);
        }
    }
});
