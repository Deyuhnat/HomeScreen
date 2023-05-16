
        console.log("HelloWorld")
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');

        
        fetch(`http://localhost:8080/api/service/uid/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          return response.json();
        }).then(data => {
            console.log(data)
           
            console.log(userId)
            var filteredData = data;
            console.log(filteredData);
            var html = '';
            filteredData.forEach(service=>{
                html += '<div class="card">\n' +
                        '  <div class="card-content">\n' +
                        '    <img src="./images/ruby.png" alt="Service Image" class="card-image">\n' +
                        '    <h2 class="card-id">' + "id: " + service.id + '</h2>\n' +
                        '    <p class="card-uid">' + "uid: " + service.uid + '</p>\n' +
                        '    <h3 class="card-name">' + service.name + '</h3>\n' +
                        '    <p class="card-price">' + "price: " + service.price + '</p>\n' +
                        '    <a href="' + service.infoLink + '" class="info-button more-info" data-id="' + service.id + '">More Info</a>\n' +
                        '  </div>\n' +
                        '</div>';
            })
            
            document.getElementById("service_cards").innerHTML = html;
            
            document.querySelectorAll('.more-info').forEach(item => {
                item.addEventListener('click', event => {
                  // Prevent default navigation
                  event.preventDefault();
      
                  // Get service id from data-id attribute
                  let serviceId = event.target.getAttribute('data-id');
      
                  // Navigate to serviceDetail.html page with the serviceId as a URL parameter
                  window.location.href = `serviceDetail.html?id=${serviceId}`;
                })
              });
      
        })

        