var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            creep.harvesting();
        }
        else {
            creep.transferEnergy();
        }
    },
    // checks if the room needs to spawn a creep
    //var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);

    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Harvester' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'harvester'};
        
            return {name, body, memory};
    }
};

module.exports = harvester;