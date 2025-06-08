document.addEventListener('DOMContentLoaded', function() {
    fetch('equipment_fetch_data.php')
        .then(response => response.json())
        .then(data => {
            const equipmentList = document.getElementById('medicines-list');
            data.forEach(equipment => {
                const equipmentCard = document.createElement('div');
                equipmentCard.classList.add('medicine-card');
                equipmentCard.innerHTML = `
                    <img src="${equipment.image_url}" alt="Equipment Image">
                    <p><strong>Item:</strong> <span class="item-name">${equipment.item_name}</span></p>
                    <p><strong>ID:</strong> <span class="item-id">${equipment.id}</span></p>
                    <p><strong>Total Items:</strong> <span class="total-items">${equipment.total_items}</span></p>
                    <div class="quantity-controls">
                        <button class="minus" data-id="${equipment.id}">-</button>
                        <button class="plus" data-id="${equipment.id}">+</button>
                    </div>
                    <div class="card-actions">
                        <button class="edit-item" data-id="${equipment.id}">Edit item</button>
                        <button class="delete-item" data-id="${equipment.id}">Delete item</button>
                    </div>
                `;
                equipmentList.appendChild(equipmentCard);
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

    fetch('equipment_update_quantity.php', {
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

    fetch('equipment_edit_item.php', {
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

    fetch('equipment_delete_item.php', {
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

    fetch('equipment_add_item.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        location.reload(); // Reload to see the updated list
    });
}
