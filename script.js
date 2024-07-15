document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearButton = document.getElementById('clearButton');

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const updateLocalStorage = () => {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    };

    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            
            const span = document.createElement('span');
            span.textContent = item.name;
            if (item.purchased) {
                span.classList.add('purchased');
            }
            span.addEventListener('click', () => {
                items[index].purchased = !items[index].purchased;
                updateLocalStorage();
                renderList();
            });
            li.appendChild(span);
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                const input = document.createElement('input');
                input.value = item.name;
                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.addEventListener('click', () => {
                    items[index].name = input.value;
                    updateLocalStorage();
                    renderList();
                });
                li.innerHTML = '';
                li.appendChild(input);
                li.appendChild(saveButton);
            });
            li.appendChild(editButton);
            
            shoppingList.appendChild(li);
        });
    };

    addButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName !== '') {
            items.push({ name: itemName, purchased: false });
            updateLocalStorage();
            renderList();
            itemInput.value = '';
        }
    });

    clearButton.addEventListener('click', () => {
        items = [];
        updateLocalStorage();
        renderList();
    });

    renderList();
});
