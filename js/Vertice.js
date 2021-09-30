class Vertice {
    nombre = "";
    vecinos = [];
    x = 0;
    y = 0;
    padding = 12;
    visitado = false;
    constructor(nombre, x, y) {
        this.nombre= nombre;
        this.x = x;
        this.y = y;
    }
    addVecino(v) {
        this.vecinos.push(v);
    }
    show() {
        fill(255);
        circle(this.x, this.y, 50);
        fill(0);
        textSize(12);
        text(this.nombre, this.x-this.padding, this.y);
    }
    isInside(){
        return dist(this.x, this.y, mouseX, mouseY) < 25;
    }
}
export default Vertice;