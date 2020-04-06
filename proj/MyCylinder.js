class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     */
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the cilinder buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Variaveis Auxiliares
        var raio = 1;
        var altura = 1; // Em y

        var ang = 0;
        var alphaAng = 2*Math.PI*raio/this.slices;

        /*
            ---> Usar coordenadas polares
            ---> Base nao precisa ser desenhada, mas seus vertices sao setados
        */

        for (var i = 0; i < this.slices ; i++){

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(ca,altura,-sa);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            this.indices.push( (3*i+0), (3*i+1) , (3*i+2) );

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                - (ca*saa-sa*caa), // 0  para ficar paralelo
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

            ang += alphaAng;
        }
        ang = 0;
        for (var i = this.slices; i < 2*this.slices ; i++){

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(caa, 0, -saa);
            this.vertices.push(caa,altura,-saa);
            this.vertices.push(ca,altura,-sa);

            this.indices.push( (3*i+0), (3*i+1) , (3*i+2) );

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa, // 0  para ficar paralelo
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

            ang += alphaAng;
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
