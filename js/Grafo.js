import Vertice from "./Vertice.js";
import Arista from "./Arista.js";
class Grafo {
    aristas = [];
    vertices = [];
    addArista(inicio, fin, peso) {
        this.aristas.push(new Arista(inicio, fin, peso));
    }
    addVertice(inicio, fin, peso) {
        this.vertices.push(new Vertice(inicio, fin, peso));
    }
    getVertice(nombre) {
        for (let index = 0; index < this.vertices.length; index++) {
            let element = this.vertices[index];
            if (element.nombre == nombre) {
                return element
            }
        }
        return null
        
    }
    getVerticeLength() {
        return this.vertices.length;
    }
    getArista(inicio, fin) {
        for (let index = 0; index < this.aristas.length; index++) {
            let a = this.aristas[index];
            if (a.inicio == inicio && a.fin == fin) {
                return a
            }
        }
        return null;
    }
    get vertices() {
        return this.vertices;
    }
    show() {
        for (let index = 0; index < this.aristas.length; index++) {
            const element = this.aristas[index];
            element.show();
        }
        for (let index = 0; index < this.vertices.length; index++) {
            const element = this.vertices[index];
            element.show();
        }
    }
}
export default Grafo;