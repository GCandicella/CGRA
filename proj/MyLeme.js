/**
 * MyLeme
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeme extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.largura = 0.5;
    }
    initBuffers() {
        var meiaaltura = 0.6/2;
        var largura = 0.5;
        this.vertices = [
            // Triangulo
            0, 0, 0,
            0, -(meiaaltura)*Math.sqrt(2)/2, (meiaaltura),
            0, -(meiaaltura)*Math.sqrt(2)/2, -(meiaaltura),

            // Quadrado
            0, -(meiaaltura)*Math.sqrt(2)/2, (meiaaltura),
            0, -(meiaaltura)*Math.sqrt(2)/2 - largura, (meiaaltura),
            0, -(meiaaltura)*Math.sqrt(2)/2 - largura, -(meiaaltura),
            0, -(meiaaltura)*Math.sqrt(2)/2, -(meiaaltura),

        ];

        this.indices = [
            // Triangulo
            0, 1, 2,
            0, 2, 1,

            // Quadrado
            3, 4, 5,
            5, 4, 3,
            3, 5, 6,
            6, 5, 3,
        ]

        this.normals = [
            1, 0, 0,
            1, -(meiaaltura)*Math.sqrt(2)/2, (meiaaltura),
            1, -(meiaaltura)*Math.sqrt(2)/2, -(meiaaltura),

            // Quadrado
            1, -(meiaaltura)*Math.sqrt(2)/2, (meiaaltura),
            1, -(meiaaltura)*Math.sqrt(2)/2 - largura, (meiaaltura),
            1, -(meiaaltura)*Math.sqrt(2)/2 - largura, -(meiaaltura),
            1, -(meiaaltura)*Math.sqrt(2)/2, -(meiaaltura),
        ]

        this.texCoords = [
            0, 1/2,
            (meiaaltura)/((meiaaltura)+largura), 0,
            (meiaaltura)/((meiaaltura)+largura), 1,
            (meiaaltura)/((meiaaltura)+largura), 0,
            1, 0,
            1, 1,
            (meiaaltura)/((meiaaltura)+0.5), 1
        ]

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}