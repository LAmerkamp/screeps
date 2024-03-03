Creep.prototype.harvesting = function harvesting(){
    const target = Game.getObjectById(this.memory.resourceSpot);
    if(this.harvest(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
} 