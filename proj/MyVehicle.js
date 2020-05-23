const VelMax = 0.8;
var AutoPilot = 0;

class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.balao = new MySphere(scene, 20, 30);
        this.gondola_s = new MySphere(scene, 20, 30);
        this.gondola_c = new MyCylinder(scene, 20, 1);
        this.helice = new MyHelice(scene);
        this.leme = new MyLeme(scene);
        this.flag = new MyPlane(scene, 20);
        this.caboflag = new MyCylinder(scene, 20, 1);

        this.initBuffers();
        this.balao.initBuffers();
        this.gondola_c.initBuffers();
        this.gondola_s.initBuffers();


        this.initMaterials();

        this.angleY = 0;
        this.velocidade = 0;
        this.posicao = {x: 0, y: 0, z: 0};

        // Flag Shader
        this.flagshader = new CGFshader(this.scene.gl, 'shaders/flag.vert', 'shaders/flag.frag');
        this.flagshader.setUniformsValues({timeFactor: 0});
        this.flagshader.setUniformsValues({uSampler1: 1})
        this.flagshader.setUniformsValues({velocidade: this.velocidade});

        // Initial State of auto pilot (and essential variables)
        this.pilotAngle = 0;                    // Angle related to X
        this.center = {x: 0, y: 0, z: 0};       // Used only in AutoPilot mode
        this.orientation = 0;                   // Orientation
        this.radius = 5;                        // Fixed radius

        // Auto Pilot variables
        this.animationTime = 5;
        this.angularSpeed = 360 / this.animationTime;
        this.deltaTime;
        this.old_t;
        this.new_t;
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

        this.flagTex = new CGFtexture(this.scene, 'images/flag.png');
    }

    balaoDisplay(){
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 2);
        this.texture.apply();
        this.balao.display();
        this.scene.popMatrix();
    };

    gondolaDisplay() {
        this.yellow.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -1, 0.5);
        this.scene.scale(0.3, 0.3, 0.3);
        this.gondola_s.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.3, 1);
        this.scene.translate(0, -3.3, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.gondola_c.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1, -0.5);
        this.scene.scale(0.3, 0.3, 0.3);
        this.gondola_s.display();
        this.scene.popMatrix();
    };

    lemesDisplay() {
        this.blue.apply();

        // Static leme
        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, -1.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.leme.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, -1.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.leme.display();
        this.scene.popMatrix();

        // Rotate leme
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0, -1.8);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.leme.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, -1.8);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.leme.display();
        this.scene.popMatrix();

    };

    helicesDisplay(){
        let time = new Date();
        this.scene.pushMatrix();
        this.scene.translate(-0.2, -1.1, -1);
        this.scene.scale(0.4, 0.4, 0.3);
        this.helice.display(this.velocidade + this.velocidade*time.getTime()/50);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -1.1, -1);
        this.scene.scale(0.4, 0.4, 0.3);
        this.helice.display(this.velocidade + this.velocidade*time.getTime()/50);
        this.scene.popMatrix();
    };

    flagDisplay(){

        // Cabos
        this.yellow.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.5);
        this.scene.rotate(-Math.PI/2.3, 1, 0, 0);
        this.scene.scale(.02, 1.8, .02);
        this.caboflag.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.5);
        this.scene.rotate(Math.PI+Math.PI/2.3, 1, 0, 0);
        this.scene.scale(.02, 1.8, .02);
        this.caboflag.display();
        this.scene.popMatrix();

        // Flag Frente
        this.scene.setActiveShader(this.flagshader);
        this.scene.pushMatrix();
        this.flagTex.bind(1);
        this.scene.translate(0, 0, -4)
        this.scene.scale(1, 1, 1.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        // Flag Trás
        this.scene.setActiveShader(this.flagshader);
        this.scene.pushMatrix();
        this.flagTex.bind(1);
        this.scene.translate(0, 0, -4)
        this.scene.scale(1, 1, 1.5);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

    }

    display(scaleFactor){
        this.scene.pushMatrix();


        this.scene.translate(this.posicao.x, this.posicao.y, this.posicao.z);
        this.scene.rotate(this.angleY * Math.PI / 180, 0, 1, 0);
        this.scene.scale(scaleFactor/50,scaleFactor/50,scaleFactor/50);
        
        this.balaoDisplay();
        this.gondolaDisplay();
        this.lemesDisplay();
        this.helicesDisplay();
        this.flagDisplay();

        this.scene.popMatrix();
    }

    reset(){
        this.posicao = {x:0, y:0, z:0};
        this.angleY = 0;
        this.velocidade = 0;
        AutoPilot = 0;
    }

    turn(val) {
        this.angleY += val;
    }

    accelerate(val) {
        if( (this.velocidade + val) < 0){
            this.velocidade = 0;
        }
        else if( (this.velocidade + val) >= VelMax){
            this.velocidade = VelMax;
        }
        else
            this.velocidade += val; // proceed
    }

    update(t){
        this.posicao.x += this.velocidade * Math.sin(this.angleY * Math.PI / 180);
        this.posicao.z += this.velocidade * Math.cos(this.angleY * Math.PI / 180);
        this.old_t = this.new_t;
        this.new_t = t;
        this.deltaTime = (this.new_t - this.old_t) / 1000;
        this.flagshader.setUniformsValues({timeFactor: t / 100 % 1000});
        this.flagshader.setUniformsValues({velocidade: this.velocidade});
    }

    switchPilot(){
        AutoPilot = AutoPilot == 1 ? 0 : 1;
    }

    getPilotStatus(){
        return AutoPilot;
    }

    calculateCenter(){
        // Inicializar:
        this.pilotAngle = this.angleY - 90;
        var temp = this.angleY + 90;
        var vector = {x: 0, z: 0};

        vector.x = Math.sin(temp * Math.PI / 180);
        vector.z = Math.cos(temp * Math.PI / 180);

        /* Determinar vetor perpendicular e normalizar (tornar num vetor unitário)
            aux = Math.sqrt( Math.pow(vector.z, 2) + Math.pow(vector.x, 2) );
            vector.z = vector.z / aux;
            vector.x = vector.x / aux;*/

        // Calcular centro
        this.center.x = this.posicao.x + this.radius * vector.x;
        this.center.z = this.posicao.z + this.radius * vector.z;
    }

    autoPilotUpdate(){
        this.posicao.x = this.center.x;
        this.posicao.z = this.center.z;
        var deltaAngle = this.deltaTime * this.angularSpeed;
        this.pilotAngle += deltaAngle;

        var vector = {x: 0, z: 0};
        vector.x = Math.sin(this.pilotAngle * Math.PI / 180);
        vector.z = Math.cos(this.pilotAngle * Math.PI / 180);

        this.posicao.x = this.center.x + vector.x * this.radius;
        this.posicao.z = this.center.z + vector.z * this.radius;
        this.angleY = this.pilotAngle + 90;
    }
}