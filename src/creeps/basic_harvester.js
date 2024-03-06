var basicHarveste = {
    /** @param {Creep} creep **/
    run: function (creep) {

        if(!creep.memory.storeEnergy && creep.store.getFreeCapacity() == 0){
            creep.say("store Energy");
            creep.memory.storeEnergy = true;
        }
        if(creep.memory.storeEnergy && creep.store[RESOURCE_ENERGY] == 0){
            creep.say("harvesting");
            creep.memory.storeEnergy = false;
        }


        if(!creep.memory.storeEnergy) { //bool zum hin und her switchen (harvester/resources abgeben)
            creep.harvesting();
        } else {
            var target = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_CONTAINER)
                    && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                
                }
            });
            
            if(target.length > 0){
                creep.transferEnergy(target[0]);
            } else if (creep.store[RESOURCE_ENERGY] != 0){
                creep.changeRole('upgrader', true);
            }
            
        }
    },

    spawnData: function(spawn) {
        var targetId = spawn.memory.roomSources[spawn.memory.sourceSelection].id;

        var bodyParts = [
            [ 1, WORK ],
            [ 1, CARRY ],
            [ 1, MOVE ]
        ];
        
        let name = 'basicHarveste' + Game.time;
        let body = bodyParts.map(item => Array(item[0]).fill(item[1])).flat();
        let memory = {role: 'basicHarveste', changedRole: false, building: false, sourceSpot: targetId, storeEnergy: false};
    
        return {name, body, memory};
    }
};

module.exports = basicHarveste;