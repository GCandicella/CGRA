class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.front = new MyPlane(scene);
        this.tras = new MyPlane(scene);
        this.bar = new MyPlane(scene);
        this.suporte = new MyCylinder(scene, 20, 1);

        this.barShader = new CGFshader(scene.gl, 'shaders/bar_billboard.vert', 'shaders/bar_billboard.frag');
        this.barShader.setUniformsValues({ drops: 0 });

        this.initMaterials();
    };

    initMaterials() {
        this.textura_contador = new CGFappearance(this.scene);
        this.textura_contador.setAmbient(0.3, 0.3, 0.3, 1);
        this.textura_contador.setDiffuse(0.4, 0.4, 0.4, 1);
        this.textura_contador.setSpecular(0.1, 0.1, 0.1, 1);
        this.textura_contador.setShininess(10.0);
        this.textura_contador.loadTexture('images/sp0.jpg');
        this.textura_contador.setTextureWrap('REPEAT', 'REPEAT');

        this.textura_contador_tras = new CGFappearance(this.scene);
        this.textura_contador_tras.setAmbient(0.3, 0.3, 0.3, 1);
        this.textura_contador_tras.setDiffuse(0.4, 0.4, 0.4, 1);
        this.textura_contador_tras.setSpecular(0.1, 0.1, 0.1, 1);
        this.textura_contador_tras.setShininess(10.0);
        this.textura_contador_tras.loadTexture('images/sptras.jpg');
        this.textura_contador_tras.setTextureWrap('REPEAT', 'REPEAT');

        this.azul = new CGFappearance(this.scene);
        this.azul.setAmbient(0.3, 0.3, 0.3, 1);
        this.azul.setDiffuse(0.4, 0.4, 0.4, 1);
        this.azul.setSpecular(0.1, 0.1, 0.1, 1);
        this.azul.setShininess(10.0);
        this.azul.loadTexture('images/blue.jpg');
        this.azul.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        this.scene.pushMatrix();

        // outdoor - front
        this.scene.pushMatrix();
        this.textura_contador.apply();
        this.scene.scale(8, 4, 4);
        this.front.display();
        this.scene.popMatrix();
        // outdoor - back
        this.scene.pushMatrix();
        this.textura_contador_tras.apply();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(8, 4, 4);
        this.front.display();
        this.scene.popMatrix();

        // Progress Bar
        this.scene.setActiveShader(this.barShader);
        this.scene.pushMatrix();
        this.textura_contador_tras.apply();
        this.scene.translate(0, -0.5, 0.2);
        this.scene.scale(6, 0.8, 4);
        this.front.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);


        // suporte1
        this.scene.pushMatrix();
        this.azul.apply();
        this.scene.translate(3, -5, -0.4);
        this.scene.scale(0.4, 4, 0.4);
        this.suporte.display();
        this.scene.popMatrix();
        // suporte2
        this.scene.pushMatrix();
        this.azul.apply();
        this.scene.translate(-3, -5, -0.4);
        this.scene.scale(0.4, 4, 0.4);
        this.suporte.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    reset(){
        this.barShader.setUniformsValues({ drops: 0 });
        this.textura_contador.loadTexture('images/sp0.jpg');
    }

    update(dropped){
        this.barShader.setUniformsValues({ drops: dropped});
        this.textura_contador.loadTexture('images/sp'+dropped+'.jpg');
    }
}