var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            creep.harvesting();
        }
        else {
            var target = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION)
                    && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                
                }
            });
            console.log(creep.name + " Abgabeort: " + target[0])
            if(target.length > 0){
                creep.transferEnergy(target[0]);
            } else if (creep.store[RESOURCE_ENERGY] != 0){
                creep.memory.role = 'upgrader';
                creep.memory.changedRole = true;
            }
            
        }
    },
    // checks if the room needs to spawn a creep
    //var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);

    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Harvester' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'harvester', changedRole: false, building: false};
        
            return {name, body, memory};
    }
};

module.exports = harvester;