/**
* MyPyramid
* @constructor
*/
const VelMax = 0.8;
var AutoPilot = 0;

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

        this.initMaterials();

        this.angleY = 0;
        this.velocidade = 0;
        this.posicao = {x: 0, y: 0, z: 0};


        this.center = {x: 0, y: 0, z: 0};       // Usado apenas em AutoPilot
        this.orientation = 0;                   // Orientação
    };

    initMaterials() {
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.3, 0.3, 0.3, 1);
        this.texture.setDiffuse(0.4, 0.4, 0.4, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/blimp.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');

        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(0.3, 0.3, 0.3, 1);
        this.yellow.setDiffuse(0.4, 0.4, 0.4, 1);
        this.yellow.setSpecular(0.1, 0.1, 0.1, 1);
        this.yellow.setShininess(10.0);
        this.yellow.loadTexture('images/yellow.jpg');
        this.yellow.setTextureWrap('REPEAT', 'REPEAT');

        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0.3, 0.3, 0.3, 1);
        this.blue.setDiffuse(0.4, 0.4, 0.4, 1);
        this.blue.setSpecular(0.1, 0.1, 0.1, 1);
        this.blue.setShininess(10.0);
        this.blue.loadTexture('images/blue.jpg');
        this.blue.setTextureWrap('REPEAT', 'REPEAT');
    }

    corpoDisplay(){
        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);
        this.texture.apply();
        this.corpo.display();
        this.scene.popMatrix();
    };

    gondolaDisplay() {
        this.yellow.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 1);
        this.scene.scale(0.3, 0.3, 0.3);
        this.gondola_s.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, 1);
        this.scene.scale(0.3, 0.7, 0.30);
        this.gondola_c.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.42, 1);
        this.scene.scale(0.3, 0.3, 0.3);
        this.gondola_s.display();
        this.scene.popMatrix();
    };

    lemesDisplay() {
        this.blue.apply();

        // Static leme
        this.scene.pushMatrix();
        this.scene.translate(0.4, -1.8, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.leme.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4, -1.8, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.leme.display();
        this.scene.popMatrix();

        // Rotate leme
        this.scene.pushMatrix();
        this.scene.translate(0, -1.8, -0.4);
        this.leme.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.8, 0.4);
        this.leme.display();
        this.scene.popMatrix();
    };

    helicesDisplay(){
        let time = new Date();
        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.helice.display(this.velocidade + this.velocidade*time.getMilliseconds()/50);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.6, 1.1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.helice.display(this.velocidade + this.velocidade*time.getMilliseconds()/50);
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
        AutoPilot = AutoPilot == 1 ? 0 : 0;
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
    }

    switchPilot(){
        AutoPilot = AutoPilot == 1 ? 0 : 1;
    }

    getPilotStatus(){
        return AutoPilot;
    }

    calculateCenter(){
        // Inicializar:
            var radius = 5;
            var vector = {x: 0, z: 0};

            vector.x = Math.cos(this.angleY);
            vector.z = Math.sin(this.anglyY);

        // Determinar vetor perpendicular e normalizar (tornar num vetor unitário)
            var aux = vector.z;
            vector.z = -vector.x;
            vector.x = aux;
            aux = Math.sqrt( Math.pow(vector.z, 2) + Math.pow(vector.x, 2) );
            vector.z = vector.z / aux;
            vector.x = vector.x / aux;

        // Calcular centro
            this.center.x = this.posicao.x + radius * vector.x;
            this.center.z = this.posicao.z + radius * vector.z;
    }

    autoPilotUpdate(){
        var radius = 5;
        this.posicao.x = this.center.x + radius * Math.cos(this.angleY * Math.PI / 180);
        this.posicao.z = this.center.z + radius * Math.sin(this.angleY * Math.PI / 180);
    }
}