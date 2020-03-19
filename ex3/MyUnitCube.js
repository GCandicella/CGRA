/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
    initBuffers() {
        // Counter-clockwise reference of vertices
        function signal(n) {
            if (n < 0)
                return -1;
            return 1;
        }

        this.vertices = [];
        this.indices = [];
        this.normals = [];

        for (let i = 0; i < 8; ++i) {
            let x = 0.5, y = 0.5, z = 0.5;

            if (Math.floor(i / 2) % 2) x *= -1;
            if (i < 4) y *= -1;
            if (Math.floor((i + 1) / 2) % 2) z *= -1;

            for (let j = 0; j < 3; j++)
                this.vertices.push(x, y, z);

            this.normals.push(signal(x), 0, 0);
            this.normals.push(0, 0, signal(z));
            this.normals.push(0, signal(y), 0);
        }

        for (let i = 0; i < 4; ++i) {
            let f = Math.floor(i / 2) % 2;
            this.indices = this.indices.concat(3 * i + f, 3 * ((i + 1) % 4) + f, 3 * (i + 4) + f);
            this.indices = this.indices.concat(3 * ((i + 1) % 4) + f, 3 * ((i + 1) % 4 + 4) + f, 3 * (i + 4) + f);
        }
        for (let i = 0; i < 2; ++i) {
            let f = 2;
            this.indices = this.indices.concat(3 * (2 + 2 * i) + f, 3 * (1 + 4 * i) + f, 3 * (6 * i) + f);
            this.indices = this.indices.concat(3 * (6 * i) + f, 3 * (3 + 4 * i) + f, 3 * (2 + 2 * i) + f);
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
	}
}

