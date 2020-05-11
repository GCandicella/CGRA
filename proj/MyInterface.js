/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, "displayAxis").name("Display Axis");
        this.gui.add(this.scene, "displaySphere").name("Display Sphere");
        this.gui.add(this.scene, "displayMap").name("Display Map");
        this.gui.add(this.scene, "displayCylinder").name("Display Cylinder");
        this.gui.add(this.scene, "displayVehicle").name("Display Vehicle");
        this.gui.add(this.scene, 'displaySkybox').name('Display Skybox');

        // Slider to modify Skybox size
        this.gui.add(this.scene, 'scaleFactorSB', 10, 100).name('Scale Factor SkyBox');

        this.gui.add(this.scene, 'selectedMaterial', this.scene.materialIDs).name('Selected Material');

        this.initKeys();

        return true;
    }

    initKeys(){
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event){
        // called when a key is pressed down // mark it as active in the array
        this.activeKeys[event.code]=true;
    }

    processKeyUp(event){
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode){
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }
}