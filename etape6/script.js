"use strict";

// slide 61-63 : Suppression des lignes sélectionnées 

const persons = [
  { nom: "nom-1", prenom: "prenom-1", points: 5 },
  { nom: "nom-2", prenom: "prenom-2", points: 10 },
  { nom: "nom-3", prenom: "prenom-3", points: 15 }
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
  checkbox.setAttribute(
    "aria-label",
    `Sélectionner ${prenom} ${nom}`
  );

  selectCell.appendChild(checkbox);
  row.appendChild(selectCell);
  table.tBodies[0].appendChild(row);
}

function update_summary() {
  document.querySelector("#p1").innerText = `${lignes} ligne(s)`;
  document.querySelector("#p3").innerText =
    `Total point(s) = ${total_points}`;
}

function doInsert(nom, prenom, points) {
  lignes += 1;
  total_points += points;

  doInsertRowTable(lignes, nom, prenom, points);
  update_summary();
}

// lire et vérifie les champs du formulaire ensuite insert dans persons 
function doNewData() {
  const elt_nom = document.querySelector("#form_nom");
  const elt_prenom = document.querySelector("#form_prenom");
  const elt_points = document.querySelector("#form_points");

  const nom = elt_nom.value.trim();
  const prenom = elt_prenom.value.trim();
  const pointsTexte = elt_points.value.trim();

  if (nom === "" || prenom === "" || pointsTexte === "") {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const points = Number.parseInt(pointsTexte, 10);

  if (!Number.isInteger(points) || points < 0) {
    alert("Veuillez saisir un nombre entier positif ou nul pour les points.");
    return;
  }

  doInsert(nom, prenom, points);
  persons.push({ nom: nom, prenom: prenom, points: points });

  elt_nom.value = "";
  elt_prenom.value = "";
  elt_points.value = "";
  elt_nom.focus();
}

// aficher 
function ConsoleTableau() {
  console.table(persons);
}

// Supprime du tableau les lignes dont la case est selctioner
function deleteRow() {
  if (lignes === 0) {
    alert("Le tableau est vide.");
    return;
  }

  const table = document.querySelector("#persons_table");
  const checkboxes = table.querySelectorAll(
    ".col_chkbox input[type='checkbox']"
  );
  const selected = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  );

  if (selected.length === 0) {
    alert("Sélectionnez au moins une ligne !");
    return;
  }

  if (!confirm("Voulez-vous vraiment supprimer les lignes sélectionnées ?")) {
    return;
  }

  const rows = Array.from(table.tBodies[0].rows);

  const selectedIndexes = selected
    .map((checkbox) => rows.indexOf(checkbox.closest("tr")))
    .sort((a, b) => b - a);

  selectedIndexes.forEach((index) => {
    const row = rows[index];
    const points = Number.parseInt(row.cells[3].textContent, 10);

    total_points -= points;
    lignes -= 1;
    persons.splice(index, 1);
    row.remove();
  });

  // Renumérote les lignes restantes à partir de 1.
  Array.from(table.tBodies[0].rows).forEach((row, index) => {
    row.cells[0].textContent = index + 1;
  });

  update_summary();
  alert("Les lignes sélectionnées ont été supprimées.");
}

function init() {
  persons.forEach((person) => {
    doInsert(person.nom, person.prenom, person.points);
  });
}

init();