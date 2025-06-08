document.addEventListener('DOMContentLoaded', function() {
    fetch('blood_fetch_data.php')
        .then(response => response.json())
        .then(data => {
            const bloodList = document.getElementById('medicines-list');
            data.forEach(blood => {
                const bloodCard = document.createElement('div');
                bloodCard.classList.add('medicine-card');
                bloodCard.innerHTML = `
                    <img src="${blood.image_url}" alt="blood Image">
                    <p><strong>Item:</strong> <span class="item-name">${blood.item_name}</span></p>
                    <p><strong>ID:</strong> <span class="item-id">${blood.id}</span></p>
                    <p><strong>Total Items:</strong> <span class="total-items">${blood.total_items}</span></p>
                    <div class="quantity-controls">
                        <button class="minus" data-id="${blood.id}">-</button>
                        <button class="plus" data-id="${blood.id}">+</button>
                    </div>
                    <div class="card-actions">
                        <button class="edit-item" data-id="${blood.id}">Edit item</button>
                        <button class="delete-item" data-id="${blood.id}">Delete item</button>
                    </div>
                `;
                bloodList.appendChild(bloodCard);
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

    fetch('blood_update_quantity.php', {
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

    fetch('blood_edit_item.php', {
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

    fetch('blood_delete_item.php', {
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

    fetch('blood_add_item.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        location.reload(); // Reload to see the updated list
    });
}
