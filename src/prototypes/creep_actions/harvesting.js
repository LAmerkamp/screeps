Creep.prototype.harvesting = function harvesting(){
    const target = Game.getObjectById(this.memory.sourceSpot);
    if(this.harvest(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
} 