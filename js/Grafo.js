import Vertice from "./Vertice.js";
import Arista from "./Arista.js";
class Grafo {
    aristas = [];
    vertices = [];
    addArista(inicio, fin, peso) {
        const InicioFin = this.getArista(inicio, fin);
        const FinInicio = this.getArista(fin, inicio);
        if (InicioFin == null && FinInicio == null) {
            this.aristas.push(new Arista(inicio, fin, peso));
        } else if (confirm("⚠️ Ya existe una arista entre estos nodos, desea reemplazar su valor?")) {
            if (InicioFin != null) {
                InicioFin.peso = peso;
            } else if (FinInicio != null) {
                FinInicio.peso = peso;
            }
        }
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
    matrizDeAdyacencia() {
        let adyacencia = [];
        console.log(this.vertices);
        for (let i = 0; i < this.vertices.length; i++) {
            adyacencia[i] = [];
            for (let j = 0; j < this.vertices.length; j++) {
                if (this.getArista(this.vertices[i], this.vertices[j]) != null) {
                    adyacencia[i][j] = 1;
                } else if (this.getArista(this.vertices[j], this.vertices[i]) != null) {
                    adyacencia[i][j] = 1;
                } else {
                    adyacencia[i][j] = 0;
                }
            }
        }
        return adyacencia;
    }
}
export default Grafo;