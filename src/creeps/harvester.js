var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            // here is the sayHello() prototype
            
            var target = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION)
                    && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                
                }
            });
            console.log(creep.name + " Abgabeort: " + target[0])
            if(target.length > 0){
                if(creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0]);
                }
            } else if (creep.store[RESOURCE_ENERGY] != 0){
                //creep.moveTo(Game.spawns['Spawn1']);
                creep.memory.role = 'upgrader';
                creep.memory.changedRole = true;
            }
            
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        console.log('Harvesters: ' + harvesters.length, room.name);

        var harvestersAsUpgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.changedRole);

        if (harvesters.length + harvestersAsUpgrader.length < 2) {
            return true;
        } 
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Harvester' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'harvester', building: false, changedRole: false};
        
            return {name, body, memory};
    }
};

module.exports = harvester;