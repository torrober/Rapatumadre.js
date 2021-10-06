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
    matrizDeDistancias() {
        let distancias = [];
        for (let i = 0; i < this.vertices.length; i++) {
            distancias[i] = [];
            for (let j = 0; j < this.vertices.length; j++) {
                if (this.getArista(this.vertices[i], this.vertices[j]) != null) {
                    distancias[i][j] = this.getArista(this.vertices[i], this.vertices[j]).peso;
                } else if (this.getArista(this.vertices[j], this.vertices[i]) != null) {
                    distancias[i][j] = this.getArista(this.vertices[j], this.vertices[i]).peso;
                } else {
                    distancias[i][j] = 0;
                }
            }
        }
        return distancias;
    }
    genTabla(dist, V, antecesores) {
        let tabla = [];
        for (let i = 0; i < V; i++) {
            tabla[i] = [];
            for (let j = 0; j < V - 1; j++) {
                const nombre = this.vertices[antecesores[i][j]].nombre;
                //p = p;
                if (dist[i][j] == Number.MAX_VALUE) {
                    tabla[i][j] = nombre + ", ∞";
                } else {
                    tabla[i][j] = nombre + ", " + dist[i][j];
                }
            }
        }
        return tabla;
    }
    gutilsInput() {
        let gutils = [];
        for (let i = 0; i < this.vertices.length; i++) {
            gutils[i] = [];
            for (let j = 0; j < this.vertices.length; j++) {
                if (this.getArista(this.vertices[i], this.vertices[j]) != null) {
                    gutils[i][j] = this.vertices[i].nombre + "|" + this.getArista(this.vertices[i], this.vertices[j]).peso;
                }
                else if (this.getArista(this.vertices[j], this.vertices[i]) != null) {
                    gutils[i][j] = this.vertices[i].nombre + "|" + this.getArista(this.vertices[j], this.vertices[i]).peso;
                }
                else {
                    gutils[i][j] = this.vertices[i].nombre + "|0";
                }
            }
        }
        return gutils;
    }
    distancia_min(dist, habilitado, V) {
        let min = Number.MAX_VALUE;
        let posmin = 0;

        for (let i = 0; i < V; i++) {
            if (habilitado[i] == false && dist[i] <= min) {
                min = dist[i];
                posmin = i;
            }
        }

        return posmin;
    }
    dijkstra(o) {
        const grafo = this.matrizDeDistancias();
        const V = grafo.length;
        console.log(V);
        let dist = [];
        let antecesores = [];
        let habilitado = [];
        //inicialización de los arreglos
        for (let i = 0; i < V; i++) {
            dist[i] = [];
            antecesores[i] = [];
            dist[i][0] = Number.MAX_VALUE;
            antecesores[i][0] = o;
            habilitado[i] = false;
        }
        dist[o][0] = 0;// La distancia del vértice origen hacia el mismo es siempre 0
        for (let j = 0; j < V - 1; j++) {
            let temp = [];
            for (let i = 0; i < V; i++) {
                temp[i] = dist[i][j];
            }
            let k = this.distancia_min(temp, habilitado, V);
            habilitado[k] = true;
            for (let i = 0; i < V; i++) {
                if (!habilitado[i] && grafo[k][i] > 0 && dist[k][j] != Number.MAX_VALUE && dist[k][j] + grafo[k][i] < dist[i][j]) {
                    dist[i][j] = dist[k][j] + grafo[k][i];
                    antecesores[i][j] = k;
                }
            }
            if (j != V - 2) {
                for (let i = 0; i < V; i++) {
                    dist[i][j + 1] = dist[i][j];
                    antecesores[i][j + 1] = antecesores[i][j];
                }
            }
        }
        return this.genTabla(dist, V, antecesores);
    }
    floyd() {
        let distancia = this.inicioMatriz();
        for (let k = 0; k < this.vertices.length; k++) {
            for (let i = 0; i < this.vertices.length; i++) {
              for (let j = 0; j < this.vertices.length; j++) {
                if (distancia[i][j] > distancia[i][k] + distancia[k][j] && distancia[i][k] != Number.MAX_VALUE && distancia[k][j] != Number.MAX_VALUE) {
                  distancia[i][j] =  distancia[i][k] + distancia[k][j];
                }
              }
            }
          }
          return distancia;
    }
    inicioMatriz() {
        let distancia = [];
        for (let i = 0; i < this.vertices.length; i++) {
            distancia[i] = [];
          for (let j = 0; j < this.vertices.length; j++) {
            if (this.getArista(this.vertices[i], this.vertices[j]) != null) {
              distancia[i][j] = this.getArista(this.vertices[i], this.vertices[j]).peso;
            } else if (this.getArista(this.vertices[j], this.vertices[i]) != null) {
              distancia[i][j] = this.getArista(this.vertices[j], this.vertices[i]).peso;
            } else if (i == j) {
              distancia[i][j] = 0;
            } else {
              distancia[i][j] = Number.MAX_VALUE;
            }
          }
        }
        return distancia;
    }
}
export default Grafo;