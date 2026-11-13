"use strict";

// slide 51-53-55 : Ajout depuis le formulaire 
const persons = [
  { nom: "nom-1", prenom: "prenom-1", points: 5 },
  { nom: "nom-2", prenom: "prenom-2", points: 10 },
  { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

//init tout 
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

// ajouter la fonction update qui msi a jour les donnes de summary 
function update_summary() {
  document.querySelector("#p1").innerText =
    `${lignes} ligne(s)`;

  document.querySelector("#p3").innerText =
    `Total point(s) = ${total_points}`;
}

function doInsert(nom, prenom, points) {
  lignes += 1;
  total_points += points;

  doInsertRowTable(lignes, nom, prenom, points);
  update_summary();
}

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

  // cas erreur de saisie 
  if (!Number.isInteger(points) || points < 0) {
    alert("Veuillez saisir un nombre de points entier positif ou nul.");
    return;
  }

  doInsert(nom, prenom, points);

  persons.push({
    nom: nom,
    prenom: prenom,
    points: points
  });

  elt_nom.value = "";
  elt_prenom.value = "";
  elt_points.value = "";
  elt_nom.focus();
}

function ConsoleTableau() {
  console.table(persons);
}

function init() {
  persons.forEach((person) => {
    doInsert(person.nom, person.prenom, person.points);
  });
}

init();