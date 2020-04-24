/**
 * My Triangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {  //passar info para o WEBGL
        this.vertices = [
            -1, 1, 0,	//0 ponto A
            -1, -1, 0,	//1 ponto B
            1, -1, 0,	//2 Ponto C
        ];
        //Counter-clockwise reference of vertices (parte da frente)
        this.indices = [
            0, 1, 2,  //ABC
            2,1,0,
        ];
        this.normals=[
            0,0,1,
            0,0,1,
            0,0,1,
        ];
        this.texCoords = [
            0, 0,
            0, 2,
            2, 2
        ];

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
