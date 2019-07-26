class BigCube {
    constructor(x,y,z,ai6) {
        this.cubeArray = [];
        const CUBE_NUM = 8;
        const CUBE_NUM_3 = 2;
        let i = 0;
        for (let j = 0; j < CUBE_NUM_3; ++j) {
        for (let k = 0; k < CUBE_NUM_3; ++k) {
        for (let l = 0; l < CUBE_NUM_3; ++l) {
            if (j == 0 || j == CUBE_NUM_3 - 1 ||
                k == 0 || k == CUBE_NUM_3 - 1 ||
                l == 0 || l == CUBE_NUM_3 - 1 
                ) {
        this.cubeArray.push(new Cube(Math.random(), Math.random(), Math.random(), 1.0, 1.0) );
        this.cubeArray[i].setPosition(x + (j-2.0) * 0.22, y + (k+1.0) * 0.22, z + (l-2.0) * 0.22);
        ai6.addObject(this.cubeArray[i]);
        ++i;
            }
        }
        }
        }
    }
    update() {
        for (const cube of this.cubeArray) {
            cube.update();
        }
    }
}