/**
* MyPyramid
* @constructor
*/
const VelMax = 0.8;

class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.corpo = new MySphere(scene, 20, 30);
        this.gondola_s = new MySphere(scene, 20, 30);
        this.gondola_c = new MyCylinder(scene, 20, 1);
        this.helice = new MyHelice(scene);
        this.leme = new MyLeme(scene);

        this.initBuffers();
        this.corpo.initBuffers();
        this.gondola_c.initBuffers();
        this.gondola_s.initBuffers();

        this.angleY = 0;
        this.velocidade = 0;
        this.posicao = {x: 0, y: 0, z: 0};
    };

    corpoDisplay(){
        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.corpo.display();
        this.scene.popMatrix();
    };

    gondolaDisplay() {
        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 1.2);
        this.scene.scale(0.3, 0.3, 0.3);
        this.gondola_s.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 1.2);
        this.scene.scale(0.3, 0.7, 0.30);
        this.gondola_c.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.42, 1.2);
        this.scene.scale(0.3, 0.3, 0.3);
        this.gondola_s.display();
        this.scene.popMatrix();
    };
    lemesDisplay() {
        this.scene.pushMatrix();
        this.scene.translate(0.8, -1.7, -0);
        this.scene.scale(0.65, 0.50, 0.70);
        this.leme.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.8, -1.7, -0);
        this.scene.scale(0.65, 0.50, 0.70);
        this.leme.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.7, -0.85);
        this.scene.rotate(this.angleY/50,0,1,0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.65, 0.50, 0.70);
        this.leme.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.7, 0.9);
        this.scene.rotate(this.angleY/50,0,1,0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.65, 0.50, 0.70);
        this.leme.display();
        this.scene.popMatrix();
    };

    helicesDisplay(){
        let time = new Date();
        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.helice.display(this.velocidade + this.velocidade*time.getMilliseconds());
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.helice.display(this.velocidade + this.velocidade*time.getMilliseconds());
        this.scene.popMatrix();
    };

    display(){
        this.scene.pushMatrix();

        this.scene.translate(this.posicao.x, this.posicao.y, this.posicao.z);
        this.scene.rotate(this.angleY * Math.PI / 180, 0, 1, 0);

        this.scene.translate(0, 0, -0.5); //pos inicial
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);

        this.corpoDisplay();
        this.gondolaDisplay()
        this.lemesDisplay();
        this.helicesDisplay();

        super.display();
        this.scene.popMatrix();
    }

    reset(){
        this.posicao = {x:0, y:0, z:0};
        this.angleY = 0;
        this.velocidade = 0;
    }

    turn(val) {
        this.angleY += val;
        if(this.angleY == 360) this.angleY = 0;
        if(this.angleY == -360) this.angleY = 0;
    }

    accelerate(val) {
        if( (this.velocidade + val) >= VelMax || (this.velocidade + val) <= -VelMax)
            return; // do nothing
        else
            this.velocidade += val; // proceed
    }

    update(){
        this.posicao.x += this.velocidade * Math.sin(this.angleY * Math.PI / 180);
        this.posicao.z += this.velocidade * Math.cos(this.angleY * Math.PI / 180);
        this.helicesDisplay();
    }
}