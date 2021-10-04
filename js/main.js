import Grafo from "./Grafo.js";
import * as alertify from 'https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.js'
const width = 500;
const height = 500;
let verticeNames = [];
let fondo;
var g;
let conectarVerticesAux = [];
function setup() {
    createCanvas(width, height);
    fondo = loadImage("./assets/Malambo.jpg");
    g = new Grafo();
}
function draw() {
    image(fondo, 0, 0, width, height);
    textSize(12);
    g.show();
    switch(parseInt(document.getElementById("options").value)) {
        case 0:
            text("Presione en cualquier parte para añadir un vertice", width / 4, height - 20);
            break;
        case 1:
            text("Presione en cualquier parte para conectar un vertice", width / 4, height - 20);
            break;
        case 2:
            text("Presione en cualquier parte para conseguir la tabla de adyacencias", width / 4, height - 20);
            break;
    }
}
function addAristasOnClick(nombre) {
    if (g.getVerticeLength() > 1) {
        const penultVerticeName = verticeNames[g.getVerticeLength() - 2];
        console.log(penultVerticeName);
        const penultVertice = g.getVertice(penultVerticeName);
        const ultimoVertice = g.getVertice(nombre);
        var peso = parseInt(prompt("Introduzca el peso:"));
        if (peso != NaN) {
            g.addArista(penultVertice, ultimoVertice, peso);
        } else {
            alert("⚠️ No puede introducir una dato no numerico");
        }
    }
}
function mouseClicked() {
    if (canvasClicked() && mouseButton == LEFT) {
        var option = document.getElementById('options').value;
        console.log(option)
        switch (parseInt(option)) {
            case 0:
                if (isInside() == null) {
                    addVertice();
                } else {
                    alert("No puede introducir un vertice dentro de otro");
                }
                break;
            case 1:
                if (isInside() != null) {
                    alert("Seleccionaste el vertice " + isInside().nombre);
                    conectarVerticesAux.push(isInside());
                    if (conectarVerticesAux.length == 2) {
                        var peso = parseInt(prompt("Introduzca el peso:"));
                        if (peso != NaN) {
                            g.addArista(conectarVerticesAux[0], conectarVerticesAux[1], peso);
                        } else {
                            alert("No puede introducir una dato no numerico");
                        }
                        conectarVerticesAux.length = 0;
                    }
                } else {
                    alert("Seleccione un vertice");
                }
                break;
            case 2:
                generateTableFromMatrix(g.matrizDeAdyacencia());
            default:
                break;
        }
    }
}
function canvasClicked() {
    if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
        return true
    }
    return false;
}
function addVertice() {
    var nombre = prompt("Introduzca el nombre del vertice");
    if (nombre != null) {
        g.addVertice(nombre, mouseX, mouseY);
        verticeNames.push(nombre);
        if (document.getElementById('check1').checked) {
            addAristasOnClick(nombre);
        }
    } else {
        alert("Error");
    }
    return nombre;
}
function isInside() {
    var vertices = g.vertices;
    for (let index = 0; index < vertices.length; index++) {
        const v = vertices[index];
        if (v.isInside()) {
            return v;
        }
    }
    return null;
}
function generateTableFromMatrix(matrix) {
    var result = "<table border=1 style='width: 100%;'>";
    for (var i = 0; i < matrix.length; i++) {
        result += "<tr>";
        for (var j = 0; j < matrix[i].length; j++) {
            result += "<td>" + matrix[i][j] + "</td>";
        }
        result += "</tr>";
    }
    result += "</table>";
    document.getElementById("tables").innerHTML = result;
    document.getElementById("table-window").style.display = 'block';
}
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;