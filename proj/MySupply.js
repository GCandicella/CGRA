const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * "L" lança um mantimento
 * Deverá demorar 3 segundos a atingir o plano XZ
 * "R" remove os mantimentos da cena e disponibiliza-os para novos lançamentos
 */
class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);
        this.posicao = {x: 0, y: 0, z: 0};
        this.box = new MyUniteCubeQuad(this.scene);
        this.state = SupplyStates.INACTIVE;
        this.initMaterials();
        this.tempodequeda = 0;
    }

    drop(dropx, dropy, dropz){
        this.state = SupplyStates.FALLING;
        this.posicao.x = dropx;
        this.posicao.y = dropy;
        this.posicao.z = dropz;
        this.time_inicio = new Date();
    }

    initTexture(image, wrap1 = 'REPEAT', wrap2 = wrap1) {
        let t = new CGFappearance(this.scene);
        t.setAmbient(0.1, 0.1, 0.1, 1);
        t.setDiffuse(0.9, 0.9, 0.9, 1);
        t.setSpecular(0.1, 0.1, 0.1, 1);
        t.setShininess(10.0);
        t.loadTexture(image);
        t.setTextureWrap(wrap1, wrap2);
        return t;
    }

    initMaterials() {
        this.cratematerial = this.initTexture("images/crate/crate.jpg");
    }

    update(tempoPassado) {
        if (this.state === SupplyStates.FALLING){
            this.tempodequeda += tempoPassado;
            if(this.tempodequeda >= 3){
                this.state = SupplyStates.LANDED;
            }
            this.posicao.y -= this.tempodequeda/3;
        }
        if(this.state === SupplyStates.LANDED){
            this.posicao.y = -20;
        }
    }

    display() {
        this.cratematerial.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.posicao.x, this.posicao.y, this.posicao.z);
        this.box.display(this.state);
        this.scene.popMatrix();
    }
}
