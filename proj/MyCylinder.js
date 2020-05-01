/**
 * MyCylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
    constructor(scene, slices, raio = 1) {
        super(scene);
        this.slices = slices;
        this.raio = raio;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords=[];

        this.initLateral();

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initLateral(){
        let ang = 0;
        let alphaAng = 2 * this.raio * Math.PI/this.slices;
        let textmap = 0;
        let alphaTex = 1/this.slices;

        for(var i = 0; i <= this.slices; i++){
            this.vertices.push(Math.cos(ang) * this.raio, 0, -Math.sin(ang) * this.raio); // XZ plane face
            this.vertices.push(Math.cos(ang) * this.raio, 1, -Math.sin(ang) * this.raio); // Y=1 plane face
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang), Math.cos(ang), 0, -Math.sin(ang));
            this.texCoords.push(textmap, 1);
            this.texCoords.push(textmap, 0);


            if (i!==0){
                this.indices.push((i*2), (i*2+1), (i*2-1));
                this.indices.push((i*2), (2*i-1), (2*i-2));
            }
            ang+=alphaAng;
            textmap+= alphaTex;
        }
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

