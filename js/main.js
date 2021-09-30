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
    textSize(16);
    g.show();
    text("Presione en cualquier parte para añadir un vertice", width / 4, height - 20);

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
            alert("No puede introducir una dato no numerico");
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
        console.log(verticeNames.length);
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
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;