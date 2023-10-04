// const characterTable = document.getElementById("character-table");
// const tbody = characterTable.querySelector("tbody");
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
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function renderTable(data) {
  let resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  // Crea la tabla Tabulator con las configuraciones especificadas
  var table = new Tabulator("#example-table", {
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 5,
    paginationSizeSelector: [40],
    movableColumns: true,
    paginationCounter: "rows",
    columns: [
      { title: "#", field: "id", width: 100, sorter: "number" },

      { title: "Nombre", field: "name", width: 150 },
      {
        title: "imagen",
        field: "image",
        width: 200,
        formatter: "image",
        formatterParams: {
          width: 200,
          height: 200,
        },
      },

      { title: "Genero", field: "gender", width: 100 },

      { title: "Especie", field: "species", width: 150 },

      { title: "Estado", field: "status", width: 150 },

      {
        title: "Driver",
        field: "car",
        hozAlign: "center",
        formatter: "tickCross",
        width: 200,
      },
    ],
    data: data, // Establece los datos iniciales aquí
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
