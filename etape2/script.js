// slide 13-14 : Insertion dynamique d’une ligne 

"use strict";
function doInsertRowTable(num, nom, prenom, points) {
  const table = document.querySelector("#persons_table");
  const row = document.createElement("tr");

  const col1 = document.createElement("td");
  const col2 = document.createElement("td");
  const col3 = document.createElement("td");
  const col4 = document.createElement("td");
  const col5 = document.createElement("td");

  col1.textContent = num;
  col2.textContent = nom;
  col3.textContent = prenom;
  col4.textContent = points;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  col5.appendChild(checkbox);

  col1.setAttribute("class", "col_number");
  col2.setAttribute("class", "col_text");
  col3.setAttribute("class", "col_text");
  col4.setAttribute("class", "col_number");
  col5.setAttribute("class", "col_chkbox");

  row.append(col1, col2, col3, col4, col5);
  table.tBodies[0].appendChild(row);
}

document.querySelector("#add_row").addEventListener("click", function () {
  doInsertRowTable(99, "nom", "prenom", 10);
});