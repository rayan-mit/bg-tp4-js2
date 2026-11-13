"use strict";

// slide 22-24-26  : Données de persons
const persons = [
  { nom: "nom1", prenom: "prenom1", points: 5 },
  { nom: "nom2", prenom: "prenom2", points: 10 },
  { nom: "nom3", prenom: "prenom3", points: 15 }
];

// init les lignes a 0 
let lignes = 0;

function doInsertRowTable(num, nom, prenom, points) {
  // precupere depuis person 
  const table = document.querySelector("#persons_table");
  const row = document.createElement("tr");

  const valeurs = [num, nom, prenom, points];
  const classes = [
    "col_number",
    "col_text",
    "col_text",
    "col_number"
  ];

  // ajouter element dans tableau 
  valeurs.forEach(function (valeur, index) {
    const cell = document.createElement("td");
    cell.textContent = valeur;
    cell.setAttribute("class", classes[index]);
    row.appendChild(cell);
  });

  const selectCell = document.createElement("td");
  selectCell.setAttribute("class", "col_chkbox");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  selectCell.appendChild(checkbox);

  row.appendChild(selectCell);
  table.tBodies[0].appendChild(row);
}

function doInsert(nom, prenom, points) {
  // incremeter ligne et apple doInsertRowTable 
  lignes++;
  doInsertRowTable(lignes, nom, prenom, points);
}

function init() {
  persons.forEach(function (person) {
    doInsert(person.nom, person.prenom, person.points);
  });
}

init();


// Affiche le tableau persons dans la console 
function ConsoleTableau() {
  console.table(persons);
}

document
  .querySelector("#show_table")
  .addEventListener("click", ConsoleTableau);