const mostrarLista = document.getElementById("mostrarLista");
const selectLista = document.getElementById("selectLista");
const fruta = ["manzana", "Pera", "banano", "mango"];

// fruta.forEach((frutas) => {
//   console.log(frutas);
// });

// let frutaD = "mango";
// let frutaDos = "pera";

// let liUno = document.createElement("li");
// liUno.textContent = frutaD;
// mostrarLista.appendChild(liUno);

// let liDos = document.createElement("li");
// liDos.textContent = frutaDos;
// mostrarLista.appendChild(liDos);

fruta.forEach((frutas) => {
  let li = document.createElement("li");
  let llenaroption = document.createElement("option");
  llenaroption.text = frutas;
  //   console.log(llenaroption);
  selectLista.appendChild(llenaroption);
  // Lista ordenada
  li.textContent = frutas;
  mostrarLista.appendChild(li);
});

/* 
1 crear el elemento
2 pasar lo que quiero mostrar en el elemento
3 agregar al hijo al elemento donde lo quiero mostrar
*/
