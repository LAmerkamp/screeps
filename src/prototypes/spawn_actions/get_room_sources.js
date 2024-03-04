Spawn.prototype.getRoomSources = function getRoomSources(){
    var a = [];
    const sources = this.room.find(FIND_SOURCES);
    for(var i = 0; i < sources.length; i++){
        a.push({id: sources[i].id, freeHarvestingSpots: undefined});
    }
    this.memory.roomSources = a;
    
}