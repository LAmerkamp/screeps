Creep.prototype.harvesting = function harvesting(){
    var sources = this.room.find(FIND_SOURCES);
    if(this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        this.moveTo(sources[0]);
    }
} 