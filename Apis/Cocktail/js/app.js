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

      //   let myDrink = data.drinks[0];
      //   console.log(myDrink.strDrink);
      //   console.log(myDrink.strDrinkThumb);
      //   console.log(myDrink.strInstructions);

      drinks.forEach((drink) => {
        const li = document.createElement("li");
        li.textContent = drink.strDrink;
        drinkList.appendChild(li);
        //     pintarResultado.innerHTML = `
        // <img src=${drink.strDrinkThumb}>
        // <h1>${drink.strCategory}</h1>`;
        //     console.log(drink.strDrinkThumb);

        // console.log(drink);
      });

      for (let i = 0; i < drinks.length; i++) {
        console.log(i);
      }
      mostrarhtml(drinks);
    });
}

function mostrarhtml(licores) {
  const contenido = document.querySelector("#contenido");

  let html = "";

  licores.forEach((licor) => {
    const { strDrink, strCategory, strDrinkThumb } = licor;

    html += `<p>nombre:${strDrink}</p>`;
    html += `<p>categoria:${strCategory}</p>`;
    html += `<img src="${strDrinkThumb}">:</img>`;
    // html += `<p>trabajo:${email}</p>`;
    // html += `<p>trabajo:${address.street}</p>`;
  });

  contenido.innerHTML = html;
}
