Creep.prototype.harvesting = function harvesting(){
    //var sources = this.room.find(FIND_SOURCES);
    /* var source = this.room.find(FIND_SOURCES, {
        filter: (s) => {
            s.id == this.memory.resourceSpot;
        }
    }); */
    const target = Game.getObjectById(this.memory.resourceSpot);
    console.log("target:" + target);
    if(this.harvest(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
} 