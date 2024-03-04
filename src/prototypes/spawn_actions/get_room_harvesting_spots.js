Spawn.prototype.getRoomHarvestingSpots = function getRoomHarvestingSpots(source){
    const x = source.pos.x;
    const y = source.pos.y;
    var freeHarvestingSpots = 0;
    const variations = [
        [-1, -1], // Feld A
        [0, -1], // Feld B
        [1, -1], // Feld C
        [-1, 0], // Feld D
        [1, 0], // Feld E
        [-1, 1], // Feld F
        [0, 1], // Feld G
        [1, 1] // Feld H
    ];

    const terrain = Game.map.getRoomTerrain(this.room.name);
    for(let i = 0; i < variations.length; i++){
        switch(terrain.get(x+variations[i][0], y + variations[i][1])) {
            case 0:
                freeHarvestingSpots++;
                break;
        }    
    }
    
    for(let i = 0; i < this.memory.roomSources.length; i++){
        if(this.memory.roomSources[i].id == source.id){
            this.memory.roomSources[i].freeHarvestingSpots = freeHarvestingSpots;
        }
    }

    
}