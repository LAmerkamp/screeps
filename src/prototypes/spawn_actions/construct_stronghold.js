Spawn.prototype.constructStronghold = function constructStronghold(){
    var x = this.pos.x;
    var y = this.pos.y;

    /*var spawnArea = [
        [-5,-5],[-4,-5],[-3,-5],[-2,-5],[-1,-5],[0,-5],[1,-5],[2,-5],[3,-5],[4,-5],[5,-5],
        [-5,-4],[-4,-4],[-3,-4],[-2,-4],[-1,-4],[0,-4],[1,-4],[2,-4],[3,-4],[4,-4],[5,-4],
        [-5,-3],[-4,-3],[-3,-3],[-2,-3],[-1,-3],[0,-3],[1,-3],[2,-3],[3,-3],[4,-3],[5,-3],
        [-5,-2],[-4,-2],[-3,-2],[-2,-2],[-1,-2],[0,-2],[1,-2],[2,-2],[3,-2],[4,-2],[5,-2],
        [-5,-1],[-4,-1],[-3,-1],[-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1],[3,-1],[4,-1],[5,-1],
        [-5,0],[-4,0],[-3,0],[-2,0],[-1,0], [SPAWN], [1,0],[2,0],[3,0],[4,0],[5,0],
        [-5,1],[-4,1],[-3,1],[-2,1],[-1,1],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],
        [-5,2],[-4,2],[-3,2],[-2,2],[-1,2],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],
        [-5,3],[-4,3],[-3,3],[-2,3],[-1,3],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],
        [-5,4],[-4,4],[-3,4],[-2,4],[-1,4],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],
        [-5,5],[-4,5],[-3,5],[-2,5],[-1,5],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]
    ];*/

    //wo soll was gebaut werden
    // 0: bleibt frei
    // 1: Extension
    // 2: Road
    // 3: Container
    var buildPattern = [
        [2],[2],[2],[2],[2],[2],[2],
        [2],[1],[1],[2],[1],[1],[2],
        [2],[1],[3],[2],[1],[1],[2],
        [2],[2],[2],[0],[2],[2],[2],
        [2],[1],[1],[2],[1],[1],[2],
        [2],[1],[1],[2],[1],[1],[2],
        [2],[2],[2],[2],[2],[2],[2]
    ];
    

    var extensionStart = [
        [x,y-3],[x-3,y],[x-6,y-3],[x-3,y-6],[x-3,y-3]
    ];

    const terrain = Game.map.getRoomTerrain(this.room.name);
    for(let i = 0; i < extensionStart.length; i++){
        var extensionArea = [
            [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
            [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],
            [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],
            [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],
            [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],
            [0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],
            [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]
        ];

        let StartX = extensionStart[i][0];
        let StartY = extensionStart[i][1];
        let isValid = true;
        for(let n = 0; n < extensionArea.length; n++){
            switch(terrain.get(StartX+extensionArea[n][0], StartY + extensionArea[n][1])) {
                case TERRAIN_MASK_WALL:
                    isValid = false;
                    break;
                case TERRAIN_MASK_SWAMP:
                    isValid = false;
                    break;
                case 0:
                    extensionArea[n][0] = StartX+extensionArea[n][0];
                    extensionArea[n][1] = StartY+extensionArea[n][1];
                    extensionArea[n][2] = buildPattern[n][0];
                    break;   
            }
            if(!isValid) break;
        }
        if(isValid){
            this.memory.strongholdPattern = extensionArea;
            break;
        }
    }
}