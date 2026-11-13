"use strict";

// slide 36-38-40-42-44   : Résumé du tableau 
const persons = [
  { nom: "nom1", prenom: "prenom1", points: 5 },
  { nom: "nom2", prenom: "prenom2", points: 10 },
  { nom: "nom3", prenom: "prenom3", points: 15 }
];

let lignes = 0;
let total_points = 0;

function doInsertRowTable(num, nom, prenom, points) {
  const table = document.querySelector("#persons_table");
  const row = document.createElement("tr");

  const values = [num, nom, prenom, points];
  const classes = [
    "col_number",
    "col_text",
    "col_text",
    "col_number"
  ];

  values.forEach((value, index) => {
    const cell = document.createElement("td");
    cell.textContent = value;
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

function update_summary() {
  const element_lignes = document.querySelector("#p1");
  const element_points = document.querySelector("#p3");

  element_lignes.innerText =
    `${lignes} ligne${lignes === 1 ? "" : "s"}`;

  element_points.innerText =
    `Total points = ${total_points}`;
}

function doInsert(nom, prenom, points) {
  lignes += 1;
  total_points += Number(points);

  doInsertRowTable(lignes, nom, prenom, points);
  update_summary();
}

function init() {
  persons.forEach((person) => {
    doInsert(person.nom, person.prenom, person.points);
  });
}

function ConsoleTableau() {
  console.table(persons);
}

document.querySelector("#add_row").addEventListener("click", () => {
  doInsert("nom", "prenom", 10);

  persons.push({
    nom: "nom",
    prenom: "prenom",
    points: 10
  });
});

document
  .querySelector("#show_table")
  .addEventListener("click", ConsoleTableau);

init();