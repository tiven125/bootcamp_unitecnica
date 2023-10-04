const btnConsultar = document.querySelector("#btnConsultar");
const pintarResultado = document.querySelector("#pintarResultado");
const drinkList = document.querySelector("#drinkList");

let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

btnConsultar.addEventListener("click", cosultarApi);

function cosultarApi() {
  const inpBuscar = document.getElementById("inpBuscar").value;
  if (inpBuscar.length == 0) {
    pintarResultado.innerHTML = `<h3 class="msg">El campo de entrada no puede estar vacío</h3>`;
  }
  fetch(url + inpBuscar)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      console.log(data);
      const drinks = data.drinks; // Obtener la lista de bebidas

        let table = new Tabulator("#tabla", {
          layout: "fitDataStretch",
          reactiveData: false, //enable reactive data
          data:drinks ,
          pagination: "local",
          paginationSize: "3",
          height: "auto",
          movableColumns: false,
          columns: [

            { field: "strDrink", title: "Nombre", sorter: "string", width: 200, headerFilter: true },
            { field: "strAlcoholic", title: "Estado", sorter: "string", width: 200, headerFilter: true },
            { field: "strCategory", title: "Especie", sorter: "string", width: 200, headerFilter: true },
            { field: "strGlass", title: "Genero", sorter: "string", width: 200, headerFilter: true },

            {
              title: "imagen",
              field: "strDrinkThumb",
              width: 200,
              formatter: "image",
              formatterParams: {
                width: 200,
                height: 200,
              },
            },
          

      
          
          ],
        });

      });





    }


