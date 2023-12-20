
function searchCountries(){

  var inputValor = document.getElementById("inputPaises").value;

  document.getElementById('tBody1').innerHTML = " ";


  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };
  
  fetch(`https://restcountries.com/v3.1/name/${inputValor}`, requestOptions)
    .then(response => response.text())
    .then(result => {

        const countryArray = JSON.parse(result);

        var htmlBody = "";

        countryArray.forEach(element => {

            var capital = '-';
            if (element.capital !== undefined && element.capital.length > 0){
                capital = element.capital[0];
            }

            htmlBody +=  `<tr>` + `<td>${element.cca2}</td>`
            + `<td>${element.name.common}</td>`
            + `<td>${element.translations.spa.common}</td>`
            + `<td>${element.name.official}</td>`
            + `<td>${capital}</td>`
            + `<td>${element.region}</td>`
            + `<td><button class="btn btn-info" onClick="verDetalles('${element.name.official}')">Ver Detalles</button></td>`
            + `</tr>`
            ;

        });

        document.getElementById("tBody1").innerHTML = htmlBody

    })
    .catch(error => console.log('error', error));   
};

//Cerrar los detalles
function cerrarDetalles(){
    document.getElementById("detailCard").style.display = "none"
}


//Funcion para ver los detalles del pais
function verDetalles(name){

    document.getElementById("cardBody").innerHTML = ""

    document.getElementById("detailCard").style.display = "block"


    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    

    fetch(`https://restcountries.com/v3.1/name/${name}`, requestOptions)
      .then(response => response.text())
      .then(result => {

          const element = JSON.parse(result);

          var htmlBody = "";

          htmlBody +=  `<p>${element[0].name.common}</p>`
          + `<p>${element[0].name.official}</p>`
          + `<p>${element[0].region}</p>`
          + `<p>${element[0].subregion}</p>`
          + `<p>${element[0].continents}</p>`
          ;


          document.getElementById("cardBody").innerHTML = htmlBody

      })
      .catch(error => console.log('error', error));   
};

// function updateTable(){
//   searchCountries();
//   initializeDataTable();
// }

//Funcion que inicializa la dataTable
// function initializeDataTable() {
//     let table = new DataTable("#table1", {
//       //$('#table1TableID').DataTable({
//       select: true,
//       bSort: true,
//       paging: true,
  
//       language: {
//         search: "Búsqueda:  ",
//         paginate: {
//           show: "Mostrando",
//           fisrt: "Primer",
//           previous: "Anterior",
//           next: "Siguiente",
//           last: "Ultimo",
//         },
//         info: "Mostrando página _PAGE_  de _PAGES_",
//         infoEmpty: "No hay datos",
//         emptyTable: "No hay facturas pendientes",
//       },
//       pageLength: 4,
//       dom: "Bfrtip",
//       buttons: ["copy", "excel", "pdf", "csv"],
//     });
//   }