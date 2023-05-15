var pageSize = 10;
        function displayPageable(pageNumber, totalElement, totalPages) {
            totalPages -= 1;
            var previousButtonStatus = "";
            var nextButtonStatus = "";

            previousPage = pageNumber - 1;
            if (previousPage < 0) {
                previousButtonStatus = "disabled";
                previousPage = 0;
            }
            nextPage = pageNumber + 1;
            if (nextPage > totalPages) {
                nextButtonStatus = "disabled";
                nextPage = totalPages;
            }
            var html = '<button id="previous_button_id" onclick="getServices(previousPage)" ' + previousButtonStatus + '>Previous</button><button onclick="getServices(nextPage)" ' + nextButtonStatus + '>Next</button>' +
                '<br><span>' + 'Page ' + (pageNumber + 1) + ' of ' + (totalPages + 1) + '</span>';
            document.getElementById("pageable_div_id").innerHTML = html;
        }
        console.log("HelloWorld")

        async function fetchData() {
            const res = await fetch("http://localhost:8080/api/service")
            return await res.json()
        }

        fetchData().then(data => {
            console.log(data)
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('id');
            console.log(userId)
            var filteredData = data.services.filter(service => service.uid === parseInt(userId));
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
        })