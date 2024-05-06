export class SerieFiguras {
    constructor() {
        this.figuras = []; 
    }

    agregarFigura(figura) {
        this.figuras.push(figura);
    }

    eliminarFigura(index) {
        this.figuras.splice(index, 1);
    }

    obtenerNumeroFiguras() {
        return this.figuras.length;
    }
}
