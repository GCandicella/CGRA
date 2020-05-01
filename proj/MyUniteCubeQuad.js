/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUniteCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.initMaterials();
    }

    initTexture(image, wrap1 = 'REPEAT', wrap2 = wrap1) {
        let t = new CGFappearance(this.scene);
        t.setAmbient(0.1, 0.1, 0.1, 1);
        t.setDiffuse(0.9, 0.9, 0.9, 1);
        t.setSpecular(0.1, 0.1, 0.1, 1);
        t.setShininess(10.0);
        t.loadTexture(image);
        t.setTextureWrap(wrap1, wrap2);
        return t;
    }

    initMaterials() {
        this.baseTex = this.initTexture("images/crate/bottom-top.jpg");
        this.lateralTex = this.initTexture("images/crate/size.jpg");
    }

    displayShape(shape, revestimento) {
        revestimento.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        shape.display();
    }

    display = function() {

        this.scene.pushMatrix();
            this.scene.translate(0, 0, -0.5);
            this.scene.rotate(Math.PI, 1, 0, 0);
            this.displayShape(this.quad, this.baseTex);
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, -0.5, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.displayShape(this.quad, this.lateralTex);
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0.5, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.rotate(Math.PI, 0, 0, 1);
            this.displayShape(this.quad, this.lateralTex);
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0.5, 0, 0);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.displayShape(this.quad, this.lateralTex);
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-0.5, 0, 0);
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.displayShape(this.quad, this.lateralTex);
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.5);
            this.displayShape(this.quad, this.baseTex);
        this.scene.popMatrix();
    };
}

