import isObject from "./isObject.js";
import Vertice from "./Vertice.js";
class Arista {
    inicio = Vertice;
    fin = Vertice;
    peso = 0;
    x1 = 0;
    x2 = 0;
    y1 = 0;
    y2 = 0;
    constructor(inicio, fin, peso){
        this.inicio = inicio;
        this.fin = fin;
        this.inicio.addVecino(this.fin);
        this.fin.addVecino(this.inicio);
        this.x1 = inicio.x;
        this.y1 = inicio.y;
        this.x2 = fin.x;
        this.y2 = fin.y;
        this.peso = peso;
    }
    show() {
        line(this.x1, this.y1, this.x2, this.y2);
        text(this.peso,(this.x1+this.x2)/2, (this.y1+this.y2)/2);
    }
}
export default Arista;