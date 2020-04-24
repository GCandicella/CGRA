/**
* MyPyramid
* @constructor
*/
const VelMax = 0.8;

class MyVehicle extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();

        this.angleY = 0;
        this.velocidade = 0;
        this.posicao = {x: 0, y:0, z:0};
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,1,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };

    display(){
        this.scene.pushMatrix();

        this.scene.translate(this.posicao.x, this.posicao.y, this.posicao.z);
        this.scene.rotate(this.angleY * Math.PI / 180, 0, 1, 0);

        this.scene.translate(0, 0, -0.5); //pos inicial
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);

        super.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    reset(){
        this.posicao = {x:0, y:0, z:0};
        this.angleY = 0;
        this.velocidade = 0;
    }

    turn(val) {
        this.angleY += val;
    }

    accelerate(val) {
        if( (this.velocidade + val) >= VelMax || (this.velocidade + val) <= -VelMax)
            return; // do nothing
        else
            this.velocidade += val; // proceed
    }

    update(){
        this.posicao.x += this.velocidade * Math.sin(this.angleY * Math.PI / 180);
        this.posicao.z += this.velocidade * Math.cos(this.angleY * Math.PI / 180);
    }
}