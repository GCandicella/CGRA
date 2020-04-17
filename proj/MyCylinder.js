class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     */
    constructor(scene, slices, raio = 1) {
        super(scene);
        this.slices = slices;
        this.raio = raio;
        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the cylinder buffers
     */
    initBuffers() {
        this.ang = 2 * this.raio * Math.PI / this.slices;
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.initLateral();
        this.initBottomTop();

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initLateral(){
        let angle = 0;
        for (var i = 0; i <= this.slices; ++i) {
            this.vertices.push(Math.cos(angle) * this.raio, 0, -Math.sin(angle) * this.raio);
            this.vertices.push(Math.cos(angle) * this.raio, this.raio, -Math.sin(angle) * this.raio);

            this.indices.push(0+2*i, 2+2*i, 3+2*i);
            this.indices.push(3+2*i, 1+2*i, 0+2*i);

            this.normals.push(Math.cos(angle), 0, -Math.sin(angle));
            this.normals.push(Math.cos(angle), 0, -Math.sin(angle));

            let tex = (i + 1) / this.slices;
            this.texCoords.push(tex, 1, tex, 0);

            angle += this.ang;
        }
    }

    initBottomTop() {
        var a = 2 * (this.slices + 1);
        let angle = 0;

        for (var i=0; i <= this.slices; ++i) {
            this.vertices.push(Math.cos(angle) * this.raio, 0, -Math.sin(angle) * this.raio);
            this.vertices.push(Math.cos(angle) * this.raio, this.raio, -Math.sin(angle) * this.raio);

            this.indices.push(a + 2*i, a + 2*i - 2    , a);
            this.indices.push(a+1    , (a+1) + 2*i - 2, (a+1) + 2*i);

            this.normals.push(0, -1, 0);
            this.normals.push(0, 1 , 0);

            angle += this.ang;
        }
    }
}