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
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Checkbox element in GUI
        this.gui.add(this.scene, 'visibility_diamond').name('MyDiamonds');
        this.gui.add(this.scene, 'visibility_triangle').name('MyTriangle');
        this.gui.add(this.scene, 'visibility_trianglesmall').name('MyTriangleSmall');
        this.gui.add(this.scene, 'visibility_trianglebig').name('MyTriangleBig');
        this.gui.add(this.scene, 'visibility_parallelogram').name('MyParallelogram');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}