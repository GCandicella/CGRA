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
        this.vertices = [
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,

            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
        ];

        this.indices = [
            2, 1, 0,
            2, 3, 1,

            1, 3, 7,
            1, 7, 5,

            4, 5, 6,
            7, 6, 5,

            4, 6, 2,
            2, 0, 4,

            1, 5, 4,
            4, 0, 1,

            6, 7, 3,
            3, 2, 6,
        ];

        this.texCoords = [];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
	}
    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }
}

