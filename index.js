"use strict"
/**
 * @file Aplicación de un alamacen
 * @author Martín Becerra
 * @version 0.1
 */
/**
 * @class Almacen
 * @property {number} capacidad
 * @prop {Array} cds Lista de CDs de nuestro almacen
 * @prop {Array} dvds Lista de DVDs de nuestro almacen
 */
class Almacen {
    /**
     * 
     * @param {number} capacidad 
     */
    //Constructor de la clase almacén, recibe la cantidad de elementos (cds o dvds) que puede haber. 
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.cds = [];
        this.dvds = [];
    }
    /**
     * @description El método introducir recibe un objeto y si hay sitio, tras comprobar si es de tipo cd o dvd lo mete dentro de la colección (Array) correspondiente. Devuelve 0 si no puede meterlo o en caso contrario el número de unidades introducidas
     * @param {Object} objeto Objeto que introducimos en el almacen
     * @returns 0 si el tipo o la canttidad de unidades es distinto de alguno de nuestros tipos del almacen o si queremos 
     *          introducir mas unidades de la que caben, y objeto.unidades si el tipo o las unidades son las correctas
     */
    introducir(objeto) {
        if (this.capacidad == 0) {
            console.log("almacen lleno")
            return 0;
        }
        if (objeto.unidades <= this.capacidad) {
            if (objeto.tipo == "cd") {
                this.cds.push(objeto)
            } else if (objeto.tipo == "dvd") {
                this.dvds.push(objeto)
            } else {
                return 0;
            }
            this.capacidad = this.capacidad - objeto.unidades;
            return objeto.unidades
        } else {
            if (objeto.tipo == "cd") {
                objeto.unidades = this.capacidad;
                this.capacidad = 0
                this.cds.push(objeto)
            } else if (objeto.tipo == "dvd") {
                objeto.unidades = this.capacidad;
                this.capacidad = 0
                this.dvds.push(objeto)
            } else {
                return 0;
            }
            return objeto.unidades
        }
    }
    /**
     * @description Este método recibe una cadena de texto y busca dentro del almacén si existe un cd o dvd con ese título o ese autor, si lo encuentra devulve un objeto con el título, autor, unidades y precio. Si no lo encuentra devuelve null
     * @param {Object} tituloautor Titulo y autor del elemento a buscar
     * @returns objDevuelto si lo encuentra o null si no lo encuentra
     */
    buscar(tituloautor) {
        for (let obj of this.cds) {
            if ((tituloautor == obj.titulo) || (tituloautor == obj.autor)) {
                let objDevuelto = {
                    titulo: obj.titulo,
                    autor: obj.autor,
                    unidades: obj.unidades,
                    precio: obj.precio
                };
                return objDevuelto;
            }
        }
        for (let obj of this.dvds) {
            if ((tituloautor == obj.titulo) || (tituloautor == obj.autor)) {
                let objDevuelto = {
                    titulo: obj.titulo,
                    autor: obj.autor,
                    unidades: obj.unidades,
                    precio: obj.precio
                };
                return objDevuelto;
            }
        }
        return null;
    }
    /**
     * @description El método comprar, recibe una cadena de texto con un título y la cantidad de dinero. Devuelve -1 si no puede comprarlo y la cantidad de dinero que le sobra si lo puede comprar
     * @param {Object} titulo Titulo del elemento a comprar
     * @param {Number} dinero Precio del elemento a comprar
     * @returns -1 si no lo puede comprar y si lo puede comprar la cantidad de dinero que le sobra 
     */
    comprar(titulo, dinero) {
        for (let obj of this.cds) {
            if (titulo == obj.titulo) {
                if (dinero >= obj.precio) {
                    this.capacidad++;
                    obj.unidades--;
                    return dinero - obj.precio;
                } else {
                    return -1;
                }
            }
        }
        for (let obj of this.dvds) {
            if (titulo == obj.titulo) {
                if (dinero >= obj.precio) {
                    this.capacidad++;
                    obj.unidades--;
                    return dinero - obj.precio;
                } else {
                    return -1;
                }
            }
        }
        return -1;
    }


}

/**************Empieza el Programa******************** */
let fs = require("fs");
let texto = fs.readFileSync("catalogo.json", "utf-8");
let catalogo = JSON.parse(texto);


let alm1 = new Almacen(150);
for (let elemento of catalogo) {
    console.log(alm1.introducir(elemento))
}



