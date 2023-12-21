//Funcion que borra la tabla
function deleteTable() {
  var table = $('#table1').DataTable();
  if (table) {
    table.destroy();
  }
}

//Funcion que realiza la busqueda de paises
async function searchCountries() {

  var inputValor = document.getElementById("inputPaises").value;

  deleteTable();

  document.getElementById('tBody1').innerHTML = " ";

  //Comienza el fetch de los datos
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  await fetch(`https://restcountries.com/v3.1/name/${inputValor}`, requestOptions)
    .then(response => response.text())
    .then(result => {

      const countryArray = JSON.parse(result);

      var htmlBody = "";

      countryArray.forEach(element => {

        var capital = '-';

        if (element.capital !== undefined && element.capital.length > 0) {
          capital = element.capital[0];
        }

        htmlBody += `<tr>` + `<td>${element.cca2}</td>`
          + `<td>${element.name.common}</td>`
          + `<td>${element.translations.spa.common}</td>`
          + `<td>${element.name.official}</td>`
          + `<td>${capital}</td>`
          + `<td>${element.region}</td>`
          + `<td><button class="btn btn-info" onClick="verDetalles('${element.cca3}')">Ver Detalles</button></td>`
          + `</tr>`
          ;
      });

      document.getElementById("tBody1").innerHTML = htmlBody;

      //Inicializar la data table con los nuevos datos
      initializeDataTable();

    })
    .catch(error => console.log('error', error));

};

//Funcion para ver los detalles del pais
async function verDetalles(name) {

  document.getElementById("cardBody").innerHTML = "";

  var htmlBody = "";
  var htmlBody2 = "";

  //Comienza el fetch de los datos
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${name}`, requestOptions);
    const element = await response.json();

    document.getElementById("flagImage").src = element[0].flags.png;

    htmlBody += `<p>Nombre: ${element[0].name.common}</p>`
      + `<p>Nombre Oficial: ${element[0].name.official}</p>`
      + `<p>Region: ${element[0].region}</p>`
      + `<p>Subregion: ${element[0].subregion}</p>`
      + `<p>Continente: ${element[0].continents}</p>`;

    const borderNames = await Promise.all(
      (element[0].borders || []).map(async nombre => {
        try {
          const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${nombre}`, requestOptions);
          const borderResult = await borderResponse.json();
          return borderResult[0].name.official;
        } catch (error) {
          console.log('error', error);
          return "";
        }
      })
    );

    htmlBody2 += `<p>Poblacion: ${element[0].population}</p>` + `<p>Nombres Países limítrofes:</p>`;
    borderNames.forEach(nombre => {
      htmlBody2 += `<p>${nombre}</p>`;
    });

    document.getElementById("cardBody").innerHTML = htmlBody;
    document.getElementById("cardBody2").innerHTML = htmlBody2;
    document.getElementById("detailCard").style.display = "block";

  } catch (error) {
    console.log('error', error);
  }
}

//Cerrar los detalles
function cerrarDetalles() {
  document.getElementById("detailCard").style.display = "none"
}

//Funcion que inicializa la dataTable
function initializeDataTable() {
  let table = new DataTable("#table1", {
    retrieve: true
  });
}