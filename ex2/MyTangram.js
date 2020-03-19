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
    }
    display = function () {

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2)/2, Math.sqrt(2)/2, 0);

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            this.scene.diamond.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2)/2, -Math.sqrt(2)/2, 0);
            this.scene.rotate(-Math.PI/4, 0, 0, 1);
            this.scene.trianglesmall.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2), -2*Math.sqrt(2),-1);
            this.scene.scale(-1, 1, 1);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            this.scene.parallelogram.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2)/2, -Math.sqrt(2) -Math.sqrt(2)/2, 0);
            this.scene.rotate(3*Math.PI/4, 0, 0, 1);
            this.scene.trianglesmall.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(Math.sqrt(2), -Math.sqrt(2)/2, 0);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.scene.trianglebig.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, -Math.sqrt(2)/2, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.scene.trianglebig.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-2 - Math.sqrt(2), -Math.sqrt(2)/2, 0);
            this.scene.rotate(3*Math.PI/4, 0, 0, 1);
            this.scene.triangle.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
        };
}

