let url = 'https://api.openbrewerydb.org/breweries'  
      fetch(url)
      .then(response => response.json())
      .then(data => mostrarData(data))
      .catch(error => console.log(error))

     // let element = document.getElementById('data')
      //element.innerHTML =
      
        const mostrarData = (data) => {
            console.log(data)
            let body = ''
            for (let i = 0; i<data.length; i++){
                body `<tr><td>${data[i].name}</td></tr>`
            }

            document.getElementById('data').innerHTML = body
        }