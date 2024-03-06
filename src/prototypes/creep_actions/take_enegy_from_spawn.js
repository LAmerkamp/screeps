Creep.prototype.takeEnergyFromSpawn = function takeEnergyFromSpawn(){
    var target = this.room.find(FIND_STRUCTURES, {
        filter: (s) => {
            return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_CONTAINER)
            && s.store[RESOURCE_ENERGY] >= this.store.getCapacity();
        
        }
    });
    if(this.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target[0]);
    }
}