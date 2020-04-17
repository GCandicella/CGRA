/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();
        this.initTextures();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.cilindro = new MyCylinder(this, 50);
        this.vehicle = new MyVehicle(this, 5);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displaySphere = false;
        this.displayMap = false;
        this.displayCylinder = false;
        this.displayVehicle = false;
    }
    checkKeys() {
        if (this.gui.isKeyPressed("KeyW")) {
            this.vehicle.accelerate(0.1);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.vehicle.accelerate(-0.1);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.vehicle.turn(10);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.vehicle.turn(-10);
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
        }
    }
    initTextures(){
        this.sphereMaterial = new CGFappearance(this);
        this.sphereMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.sphereMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sphereMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.sphereMaterial.setShininess(10.0);
        this.sphereMaterial.loadTexture("images/earth.jpg");
        this.sphereMaterial.setTextureWrap("Repeat", "Clamp to edge");
    }
    initColor(r, g, b) {
        r /= 255; // deixar de 0 a 1
        g /= 255; // deixar de 0 a 1
        b /= 255; // deixar de 0 a 1
        let cor = new CGFappearance(this);
        cor.setAmbient(r, g, b, 1.0);
        cor.setDiffuse(0, 0, 0, 1.0);
        cor.setSpecular(0, 0, 0, 0);
        cor.setShininess(10.0);
        return cor;
    }

    initMaterials() {
        this.purplematerial = this.initColor(150, 80, 190);
        this.pinkmaterial = this.initColor(255, 155, 210);
        this.greenmaterial = this.initColor(46, 255, 74);
        this.orangematerial = this.initColor(255, 155, 0);
        this.bluematerial = this.initColor(0, 155, 255);
        this.redmaterial = this.initColor(255, 30, 30);
        this.yellowmaterial = this.initColor(255, 255, 0);
    }
    initLights() {
        this.setGlobalAmbientLight(0.6, 0.6, 0.6, 1.0);

        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        if (this.displaySphere){
            this.sphereMaterial.apply();
            this.sphere.display();
        }

        if(this.displayCylinder){
            this.cilindro.display();
        }

        if(this.displayVehicle){
            this.vehicle.display();
        }

        // ---- END Primitive drawing section
    }
}