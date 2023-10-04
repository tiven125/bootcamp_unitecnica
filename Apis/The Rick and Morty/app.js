const firstPageButton = document.getElementById("paginaInicio");
const prevPageButton = document.getElementById("PaginaAnterior");
const nextPageButton = document.getElementById("paginaSiguiente");
const lastPageButton = document.getElementById("PaginaUltima");
const pageNumberInput = document.getElementById("page-number");
const goToPageButton = document.getElementById("BuscarPagina");
let currentPage = 1;

async function fetchCharacters(page) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();
    // console.log(data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function renderTable(data) {
  let resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";
  data.forEach((resultado) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="card card-estilos" style="width: 18rem;">
        <img src="${resultado.image}" class="card-img-top" alt="...">
        <div class="card-body">
         <h2 class="card-title">${resultado.name}</h2>
         <p class="card-text">${resultado.status}.</p>
         <p class="card-text">${resultado.species}.</p>
  </div>
</div>


`;

    resultadoDiv.appendChild(div);
    console.log(currentPage);
  });
}

async function updateTable() {
  const characters = await fetchCharacters(currentPage);
  renderTable(characters);
}

firstPageButton.addEventListener("click", () => {
  currentPage = 1;
  updateTable();
});

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
});

nextPageButton.addEventListener("click", () => {
  currentPage++;
  updateTable();
});

lastPageButton.addEventListener("click", async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  currentPage = data.info.pages;
  updateTable();
});

goToPageButton.addEventListener("click", () => {
  const pageNumber = parseInt(pageNumberInput.value);
  if (pageNumber >= 1) {
    currentPage = pageNumber;
    updateTable();
  }
});

// Initial load
updateTable();
