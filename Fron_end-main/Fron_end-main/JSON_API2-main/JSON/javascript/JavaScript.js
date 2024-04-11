
window.onload = function () {
    fetchProducts();
};

function fetchProducts() {
    fetch('http://localhost:8888/products', {mode: "cors"})
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            Object.values(data).forEach(product => {
                const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.marca}</td>
                        <td>${product.modello}</td>
                        <td>${product.prezzo}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onclick="showProduct(${product.id})">Visualizza</button>
                            <button type="button" class="btn btn-warning" onclick="editProduct(${product.id})">Modifica</button>
                            <button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">Cancella</button>
                        </td>
                    </tr>
                `;
                productList.innerHTML += row;
            });
        });
}

function showProduct(id) {
    fetch(`http://localhost:8888/products/${id}`, {mode: "cors"})
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

function editProduct(id) {
    fetch(`http://localhost:8888/products/${id}`, {mode: "cors"})
        .then(response => response.json())
        .then(data => {
            const modalBody = document.getElementById('editModalBody');
            modalBody.innerHTML =`
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
/*
document.getElementById('saveChanges').addEventListener('click', function () {
    const id = document.getElementById('productId').value;
    const formData = {
        marca: document.getElementById('marcaEdit').value,
        modello: document.getElementById('modelloEdit').value,
        prezzo: document.getElementById('prezzoEdit').value
    };

    fetch(`http://localhost:8888/products/${id}`, {
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
*/
btn = document.getElementById('Salva')
console.log(btn)
btn.addEventListener('click', function(){
    const id = document.getElementById('productId').value;
    const formData = {
        marca: document.getElementById('marca').value,
        modello: document.getElementById('modello').value,
        prezzo: document.getElementById('prezzo').value
    };

    fetch(`http://localhost:8888/products/${id}`, {
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