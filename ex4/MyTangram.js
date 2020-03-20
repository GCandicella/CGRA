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
        let cor = new CGFappearance(this.scene);
        cor.setAmbient(r, g, b, 1.0);
        cor.setDiffuse(0, 0, 0, 1.0);
        cor.setSpecular(1.0, 1.0, 1.0, 1.0);
        cor.setShininess(10.0);
        return cor;
    }

    initTexture() {
        let t = new CGFappearance(this.scene);
        t.setAmbient(0.1, 0.1, 0.1, 1);
        t.setDiffuse(0.9, 0.9, 0.9, 1);
        t.setSpecular(0.1, 0.1, 0.1, 1);
        t.setShininess(10.0);
        t.loadTexture('images/tangram.png');
        t.setTextureWrap('REPEAT', 'REPEAT');
        return t;
    }

    initMaterials() {
        this.purple = this.initColor(150, 80, 190);
        this.pink = this.initColor(255, 155, 210);
        this.green = this.initColor(46, 255, 74);
        this.orange = this.initColor(255, 155, 0);
        this.blue = this.initColor(0, 155, 255);
        this.red = this.initColor(255, 30, 30);
        this.yellow = this.initColor(255, 255, 0);
        this.textTangram = this.initTexture();
    }

    static displayShape(shape, revestimento) {
        revestimento.apply();
        shape.display();
    }

    display = function() {

        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(-Math.sqrt(2)/2, Math.sqrt(2)/2, 0);

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            MyTangram.displayShape(this.diamond, this.textTangram);
            this.scene.popMatrix();


            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2)/2, -Math.sqrt(2)/2, 0);
            this.scene.rotate(-Math.PI/4, 0, 0, 1);
            MyTangram.displayShape(this.trianglesmall, this.red);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2), -2*Math.sqrt(2),-1);
            this.scene.scale(-1, 1, 1);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            MyTangram.displayShape(this.parallelogram, this.yellow);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2)/2, -Math.sqrt(2) -Math.sqrt(2)/2, 0);
            this.scene.rotate(3*Math.PI/4, 0, 0, 1);
            MyTangram.displayShape(this.trianglesmall, this.purple);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2), -Math.sqrt(2)/2, 0);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            MyTangram.displayShape(this.trianglebig, this.blue);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, -Math.sqrt(2)/2, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            MyTangram.displayShape(this.trianglebig, this.orange);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-2 - Math.sqrt(2), -Math.sqrt(2)/2, 0);
            this.scene.rotate(3*Math.PI/4, 0, 0, 1);
            MyTangram.displayShape(this.triangle, this.pink);
            this.scene.popMatrix();

        this.scene.popMatrix();
        
        };
}

