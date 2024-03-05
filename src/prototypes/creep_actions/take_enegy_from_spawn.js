Creep.prototype.takeEnergyFromSpawn = function takeEnergyFromSpawn(){
    var spawn = Game.spawns['Spawn1'];
    //var spawn = this.room.find(FIND_MY_SPAWNS)[0];
    if(this.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(spawn);
    }
}