class MyHelice extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tubo = new MySphere(scene,40,50);
        this.tubo.initBuffers();
    }

    helice(spin){
        this.scene.pushMatrix();
        this.scene.rotate(spin,0,0,1);

        this.scene.pushMatrix();
        this.scene.scale(0.1,0.6,0.01);
        this.tubo.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(0.1,0.6,0.01);
        this.tubo.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        // Bico Na Frente da Helice
        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.scale(0.1,0.1,0.1);
        this.tubo.display();
        this.scene.popMatrix();
    }

    display(spin){
        this.helice(spin);
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.3,0.5);
        this.scene.translate(0,0,1);
        this.tubo.display();
        this.scene.popMatrix();
    }
}