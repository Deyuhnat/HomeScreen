const boxContainer = document.querySelector(".box-container");
let services;
let serviceContent = '';

const buildCardTemplate = (service) => {
    return `
        <div class="box">
            <img src="./images/${service.image}" alt="">
            <h3>${service.service}</h3>
            <p>${service.description}</p>
            <a href="${service.information}" class="btn">More infomation</a>
        </div>
    `;
}

fetch('http://localhost:3000/services')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        services = data;

        const cardTemplate = `
            <div class="box">
                <img src="./images/java.png" alt="">
                <h3>Service 1</h3>
                <p>Description</p>
                <a href="#" class="btn">More infomation</a>
            </div>
        `;
        
        for (let i = 0; i < services.length; i++) {
            serviceContent += buildCardTemplate(services[i]);
        }
        
        boxContainer.innerHTML = serviceContent;
    })

// search
const serviceForm = document.querySelector('#service-form');
const searchInput = document.querySelector('#search-input');

serviceForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (searchInput.value.toLowerCase() === '') {
        boxContainer.innerHTML = serviceContent;
        return;
    }

    const filteredList = [];
    for (sv of services) {
        if (searchInput.value.toLowerCase() === sv.service.toLowerCase()) {
            console.log('found:', sv.service);
            filteredList.push(sv);
        }
    }

    console.log('filtered list:', filteredList);

    let filteredServiceContent = '';

    for (let i = 0; i < filteredList.length; i++) {
        filteredServiceContent += buildCardTemplate(filteredList[i]);
    }

    boxContainer.innerHTML = filteredServiceContent;

})
