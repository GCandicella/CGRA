/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.trianglesmall = new MyTriangleSmall(scene);
        this.trianglebig = new MyTriangleBig(scene);
        this.initMaterials();
    }

    initColor(r, g, b) {
        r /= 255; // deixar de 0 a 1
        g /= 255; // deixar de 0 a 1
        b /= 255; // deixar de 0 a 1
        let aux = new CGFappearance(this.scene);
        aux.setAmbient(r, g, b, 1.0);
        aux.setDiffuse(0, 0, 0, 1.0);
        aux.setSpecular(1.0, 1.0, 1.0, 1.0);
        aux.setShininess(10.0);
        return aux;
    }

    initMaterials() {
        this.purple = this.initColor(150, 80, 190);
        this.green = this.initColor(0, 255, 0);
        this.pink = this.initColor(255, 155, 207);
        this.orange = this.initColor(255, 155, 0);
        this.blue = this.initColor(0, 155, 255);
        this.red = this.initColor(255, 27, 27);
        this.yellow = this.initColor(255, 255, 0);
    }

    displayShape(shape, color) {
        //this.scene.material4.apply();
        color.apply();
        shape.display();
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2)/2, Math.sqrt(2)/2, 0);

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            this.displayShape(this.diamond, this.scene.customMaterial);
            this.scene.popMatrix();


            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2)/2, -Math.sqrt(2)/2, 0);
            this.scene.rotate(-Math.PI/4, 0, 0, 1);
            this.displayShape(this.trianglesmall, this.red);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2), -2*Math.sqrt(2),-1);
            this.scene.scale(-1, 1, 1);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            this.displayShape(this.parallelogram, this.yellow);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2)/2, -Math.sqrt(2) -Math.sqrt(2)/2, 0);
            this.scene.rotate(3*Math.PI/4, 0, 0, 1);
            this.displayShape(this.trianglesmall, this.purple);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2), -Math.sqrt(2)/2, 0);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.displayShape(this.trianglebig, this.blue);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, -Math.sqrt(2)/2, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.displayShape(this.trianglebig, this.orange);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-2 - Math.sqrt(2), -Math.sqrt(2)/2, 0);
            this.scene.rotate(3*Math.PI/4, 0, 0, 1);
            this.displayShape(this.triangle, this.pink);
            this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.materials[this.scene.selectedMaterial].apply();
        };
}

