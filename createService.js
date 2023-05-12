document.getElementById('create-service-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const serviceName = document.getElementById('serviceName').value;
    const servicePriceInput = document.getElementById('servicePrice').value;
    const serviceDescription = document.getElementById('serviceDescription').value;

    const user = JSON.parse(localStorage.getItem('user'));
    const uid = user.id;

    if (isNaN(servicePriceInput) || Number(servicePriceInput) !== parseFloat(servicePriceInput)) {
        alert("Please input a valid number for the price.");
        return;
    }

    const servicePrice = parseFloat(servicePriceInput);

    const service = {
        uid: uid,
        name: serviceName,
        price: servicePrice,
        description: serviceDescription
    };

    createService(service);
});

async function createService(service) {
    try {
        const response = await fetch('http://localhost:8080/api/service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(service)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            alert('Service created successfully. ID: ' + responseData.id);
        } else {
            const errorData = await response.json();
            console.log(errorData);
            alert('Failed to create service. Error: ' + errorData.error);
        }
    } catch (error) {
        console.log(error);
        alert('Error: ' + error.message);
    }
}
