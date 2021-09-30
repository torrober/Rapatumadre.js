import Grafo from "./Grafo.js";
const width = 600;
const height = 600;
let verticeNames = [];
let fondo;
var g;
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
function mouseClicked() {
    if (mouseButton == LEFT && isInside() == null) {
        var nombre = prompt("Introduzca el nombre de la antena");
        if (nombre != null) {
            g.addVertice(nombre, mouseX, mouseY);
            verticeNames.push(nombre);
            console.log(verticeNames.length);
            if (g.getVerticeLength() > 1) {
                const penultVerticeName = verticeNames[g.getVerticeLength() - 2];
                console.log(penultVerticeName);
                const penultVertice = g.getVertice(penultVerticeName);
                const ultimoVertice = g.getVertice(nombre);
                var peso = parseInt(prompt("Introduzca el peso:"));
                if(peso != NaN) {
                    g.addArista(penultVertice, ultimoVertice, peso);
                } else {
                    alert("No puede introducir una dato no numerico");
                }
            }
        } else {
            alert("Error");
        }
    }
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