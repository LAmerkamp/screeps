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
                    return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_CONTAINER)
                    && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                
                }
            });
            
            if(target.length > 0){
                creep.transferEnergy(target[0]);
            } else if (creep.store[RESOURCE_ENERGY] != 0){
                creep.say("werde zu upgrader");
                creep.memory.building = true;
                creep.changeRole('upgrader', true);
            }
            
        }
    },

    spawnData: function(spawn) {
        var targetId = spawn.memory.roomSources[spawn.memory.sourceSelection].id;

        var maxSpawnStorage = spawn.room.energyCapacityAvailable;

        let maxValueForWork = Math.trunc((maxSpawnStorage / 2) / 100);
        let maxValueForCarry = Math.trunc((maxSpawnStorage /4 ) / 50);
        let maxValueForMove = Math.trunc((maxSpawnStorage / 4) / 50);

        let rest = maxSpawnStorage - maxValueForWork*100 - maxValueForCarry*50 - maxValueForMove*50;
        if(rest > 100){
            maxValueForCarry++;
            maxValueForMove++;
        } else if(rest >= 50){
            maxValueForMove++;
        }
        if(maxValueForWork + maxValueForCarry + maxValueForMove > 50 ){
            maxValueForWork = 20;
            maxValueForCarry = 15;
            maxValueForMove = 15;
        }
        var bodyParts = [
            [ maxValueForWork, WORK ],
            [ maxValueForCarry, CARRY ],
            [ maxValueForMove, MOVE ]
        ];
        
        let name = 'basicHarveste' + Game.time;
        let body = bodyParts.map(item => Array(item[0]).fill(item[1])).flat();
        let memory = {role: 'basicHarveste', changedRole: false, building: false, sourceSpot: targetId, storeEnergy: false};
    
        return {name, body, memory};
    }
};

module.exports = basicHarveste;