// Funzione per caricare i prodotti iniziali
window.onload = function () {
    fetchProducts();
};

// Funzione per caricare i prodotti tramite API
function fetchProducts() {
    fetch('http://addr:port/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            data.forEach(product => {
                const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.marca}</td>
                        <td>${product.modello}</td>
                        <td>${product.prezzo}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onclick="showProduct(${product.id})">Show</button>
                            <button type="button" class="btn btn-warning" onclick="editProduct(${product.id})">Edit</button>
                            <button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                        </td>
                    </tr>
                `;
                productList.innerHTML += row;
            });
        });
}

// Funzione per mostrare i dettagli di un prodotto
function showProduct(id) {
    fetch(`http://addr:port/products/${id}`)
        .then(response => response.json())
        .then(data => {
            const modalBody = document.getElementById('showModalBody');
            modalBody.innerHTML = `
                <p><strong>Marca:</strong> ${data.marca}</p>
                <p><strong>Modello:</strong> ${data.modello}</p>
                <p><strong>Prezzo:</strong> ${data.prezzo}</p>
            `;
            $('#showModal').modal('show');
        });
}

// Funzione per modificare un prodotto
function editProduct(id) {
    fetch(`http://addr:port/products/${id}`)
        .then(response => response.json())
        .then(data => {
            const modalBody = document.getElementById('editModalBody');
            modalBody.innerHTML = `
                <input type="hidden" id="productId" value="${data.id}">
                <div class="mb-3">
                    <label for="marcaEdit" class="form-label">Marca</label>
                    <input type="text" class="form-control" id="marcaEdit" value="${data.marca}">
                </div>
                <div class="mb-3">
                    <label for="modelloEdit" class="form-label">Modello</label>
                    <input type="text" class="form-control" id="modelloEdit" value="${data.modello}">
                </div>
                <div class="mb-3">
                    <label for="prezzoEdit" class="form-label">Prezzo</label>
                    <input type="text" class="form-control" id="prezzoEdit" value="${data.prezzo}">
                </div>
            `;
            $('#editModal').modal('show');
        });
}

// Funzione per salvare le modifiche del prodotto
document.getElementById('saveChanges').addEventListener('click', function () {
    const id = document.getElementById('productId').value;
    const formData = {
        marca: document.getElementById('marcaEdit').value,
        modello: document.getElementById('modelloEdit').value,
        prezzo: document.getElementById('prezzoEdit').value
    };

    fetch(`http://addr:port/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            // Ricarica la lista dei prodotti dopo la modifica
            fetchProducts();
            // Chiudi il modale di modifica
            $('#editModal').modal('hide');
        } else {
            // Gestisci l'errore
        }
    });
});
