/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MySquare(scene);
        this.initMaterials();
    }

    initTexture(image, wrap1 = 'REPEAT', wrap2 = wrap1) {
        let t = new CGFappearance(this.scene);
        t.setAmbient(0.1, 0.1, 0.1, 1);
        t.setDiffuse(0.9, 0.9, 0.9, 1);
        t.setSpecular(0.1, 0.1, 0.1, 1);
        t.setShininess(10.0);
        t.loadTexture('images/'+ image + '.png');
        t.setTextureWrap(wrap1, wrap2);
        return t;
    }

    initMaterials() {
        this.cubemap = this.initTexture("cubemap");
    }

    displayShape(shape, revestimento) {
        revestimento.apply();
        shape.display();
    }

    display = function() {

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([1/2, 2/3, 1/2, 1/3, 1/4, 1/3, 1/4, 2/3  ]);
        this.displayShape(this.quad, this.cubemap);
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([1/4, 2/3, 1/4, 1, 1/2, 1, 1/2, 2/3 ]);
        this.displayShape(this.quad, this.cubemap);
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([1/4, 0, 1/4, 1/3, 1/2, 1/3, 1/2, 0 ]);
        this.displayShape(this.quad, this.cubemap);
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.updateTexCoords([3/4, 2/3, 3/4, 1/3, 2/4, 1/3, 2/4, 2/3  ]);
        this.displayShape(this.quad, this.cubemap);
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([0, 1/3, 0, 2/3, 1/4, 2/3, 1/4, 1/3  ]);
        this.displayShape(this.quad, this.cubemap);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([3/4, 1/3, 3/4, 2/3, 1, 2/3, 1, 1/3  ]);
        this.displayShape(this.quad, this.cubemap);
        this.scene.popMatrix();

    };
}

