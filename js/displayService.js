async function fetchServicesByUid(uid) {
    try {
        const response = await fetch(`http://localhost:8080/api/service/uid/${uid}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Failed to fetch services.");
        }
    } catch (error) {
        console.error(error);
        alert("Error fetching services: " + error.message);
    }
}

function createServiceRow(service) {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = service.id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = service.name;
    row.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = service.price;
    row.appendChild(priceCell);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = service.description;
    row.appendChild(descriptionCell);

    const actionsCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteService(service.id));
    actionsCell.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editService(service));
    actionsCell.appendChild(editButton);

    row.appendChild(actionsCell);

    return row;
}

async function displayServices() {
    const user = JSON.parse(localStorage.getItem("user"));
    const uid = user.id;

    const services = await fetchServicesByUid(uid);
    const tableBody = document.getElementById("services-table").getElementsByTagName("tbody")[0];

    services.forEach(service => {
        const serviceRow = createServiceRow(service);
        tableBody.appendChild(serviceRow);
    });
}

async function deleteService(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/service/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Service deleted successfully');
            location.reload(); // Refresh the page to update the list of services
        } else {
            throw new Error('Failed to delete service');
        }
    } catch (error) {
        console.error(error);
        alert('Error deleting service: ' + error.message);
    }
}

function editService(service) {
    const editForm = document.createElement('form');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = "Name: ";
    editForm.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.value = service.name;
    editForm.appendChild(nameInput);

    const priceLabel = document.createElement('label');
    priceLabel.textContent = "Price: ";
    editForm.appendChild(priceLabel);

    const priceInput = document.createElement('input');
    priceInput.type = "number";
    priceInput.step = "0.01";
    priceInput.value = service.price;
    editForm.appendChild(priceInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = "Description: ";
    editForm.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.value = service.description;
    editForm.appendChild(descriptionInput);

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    editForm.appendChild(submitButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    editForm.appendChild(cancelButton);

    document.body.appendChild(editForm);

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.removeChild(editForm);
    });

    document.body.appendChild(editForm);

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check user input
        if (!nameInput.value.trim()) {
            alert('Please enter a service name');
            return;
        }

        if (isNaN(priceInput.value) || Number(priceInput.value) < 0) {
            alert('Please enter a valid price');
            return;
        }

        if (!descriptionInput.value.trim()) {
            alert('Please enter a service description');
            return;
        }

        const updatedService = {
            ...service,
            name: nameInput.value.trim(),
            price: parseFloat(priceInput.value),
            description: descriptionInput.value.trim(),
        };

        try {
            const response = await fetch(`http://localhost:8080/api/service/${service.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedService),
            });

            if (response.ok) {
                alert('Service updated successfully');
                location.reload(); // Refresh the page to update the service data
            } else {
                throw new Error('Failed to update service');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating service: ' + error.message);
        }
    });
}


// Finally, call the displayServices function to fetch and display the services when the page loads
displayServices();

