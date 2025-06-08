document.addEventListener('DOMContentLoaded', function() {
    fetch('medicine_fetch_data.php')
        .then(response => response.json())
        .then(data => {
            const medicinesList = document.getElementById('medicines-list');
            data.forEach(medicine => {
                const medicineCard = document.createElement('div');
                medicineCard.classList.add('medicine-card');
                medicineCard.innerHTML = `
                    <img src="${medicine.image_url}" alt="Medicine Image">
                    <p><strong>Item:</strong> <span class="item-name">${medicine.item_name}</span></p>
                    <p><strong>ID:</strong> <span class="item-id">${medicine.id}</span></p>
                    <p><strong>Total Items:</strong> <span class="total-items">${medicine.total_items}</span></p>
                    <div class="quantity-controls">
                        <button class="minus" data-id="${medicine.id}">-</button>
                        <button class="plus" data-id="${medicine.id}">+</button>
                    </div>
                    <div class="card-actions">
                        <button class="edit-item" data-id="${medicine.id}">Edit item</button>
                        <button class="delete-item" data-id="${medicine.id}">Delete item</button>
                    </div>
                `;
                medicinesList.appendChild(medicineCard);
            });

            document.querySelectorAll('.plus').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    updateQuantity(id, 'increase');
                });
            });

            document.querySelectorAll('.minus').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    updateQuantity(id, 'decrease');
                });
            });

            document.querySelectorAll('.edit-item').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    editItem(id);
                });
            });

            document.querySelectorAll('.delete-item').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    deleteItem(id);
                });
            });
        });
});

function updateQuantity(id, operation) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('operation', operation);

    fetch('medicine_update_quantity.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        location.reload(); // Reload to see the updated quantity
    });
}

function editItem(id) {
    const itemName = prompt('Enter new item name:');
    const itemID = prompt('Enter new item ID:');
    const itemImageURL = prompt('Enter new image URL:');

    const formData = new FormData();
    formData.append('id', id);
    formData.append('item_name', itemName);
    formData.append('item_id', itemID);
    formData.append('image_url', itemImageURL);

    fetch('medicine_edit_item.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        location.reload(); // Reload to see the updated item
    });
}

function deleteItem(id) {
    const formData = new FormData();
    formData.append('id', id);

    fetch('medicine_delete_item.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        location.reload(); // Reload to see the updated list
    });
}

const addItemButton = document.querySelector('.add-item-button');
addItemButton.addEventListener('click', function() {
    addItem();
});

function addItem() {
    const itemName = prompt('Enter item name:');
    const itemID = prompt('Enter item ID:');
    const imageURL = prompt('Enter image URL:');
    const totalItems = prompt('Enter total items:');

    const formData = new FormData();
    formData.append('item_name', itemName);
    formData.append('item_id', itemID);
    formData.append('image_url', imageURL);
    formData.append('total_items', totalItems);

    fetch('medicine_add_item.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        location.reload(); // Reload to see the updated list
    });
}
