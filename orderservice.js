// fetch(API)

const fakeData = [
    {
        name: 'java',
        uid: 5
    },
    {
        name: 'java',
        uid: 2
    },
    {
        name: 'java',
        uid: 5
    },
    {
        name: 'java',
        uid: 3
    },
    {
        name: 'java',
        uid: 4
    },
];

console.log(fakeData);
console.log("userId:", userId);

urlParams = new URLSearchParams(window.location.search);
userId = urlParams.get('id');

const filteredData = [];

fakeData.forEach(service => {
    if (service.uid === parseInt(userId)) {
        filteredData.push(service);        
    }
});

console.log("filtered Data:", filteredData);

const buildCard = (data) => {
    return '<div class="card">\n' +
    '  <div class="card-content">\n' +
    '    <img src="./images/ruby.png" alt="Service Image" class="card-image">\n' +
    '    <h2 class="card-id">' + "id: " + data.uid + '</h2>\n' +
    '    <p class="card-uid">' + "uid: " + data.uid + '</p>\n' +
    '    <h3 class="card-name">' + data.name + '</h3>\n' +
    '    <p class="card-price">' + "price: " + data.name + '</p>\n' +
    '    <a href="' + data.name + '" class="info-button more-info" data-id="' + data.name + '">More Info</a>\n' +
    '  </div>\n' +
    '</div>';
}

const mainContent = document.querySelector('#main-content');

let mainHTML = '';

filteredData.forEach(data => {
    mainHTML += buildCard(data);
});

mainContent.innerHTML = mainHTML;
