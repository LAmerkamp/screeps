Creep.prototype.transferEnergy = function transferEnergy() {
    if(this.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(Game.spawns['Spawn1']);
    }
}