var upgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var avalibleEnergy = Game.rooms[creep.room.name].energyAvailable;
        var maxStorage = Game.rooms[creep.room.name].energyCapacityAvailable;
        var freeStorage = maxStorage - avalibleEnergy;


        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.say('get Energy');
            creep.memory.building = false;
            if(creep.memory.changedRole){
                creep.say("werde zu harvester");
                creep.memory.storeEnergy = false;
                creep.changeRole('basicHarveste', false);
            } else if(freeStorage == 0){
                creep.memory.sourceQuelle = 'structure';
            }
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.say('upgrade');
            creep.memory.building = true;
        }



        if(creep.memory.building){
            if(creep.memory.changedRole && freeStorage > avalibleEnergy){
                creep.say("werde zu harvester");
                creep.memory.storeEnergy = true;
                creep.changeRole('basicHarveste', false);
            }
            creep.upgeradeContollerOrBuild();
        } else {
            if(creep.memory.sourceQuelle == 'source'){
                creep.harvesting();
            } else if(creep.memory.sourceQuelle == 'structure'){
                creep.takeEnergyFromSpawn();
                if(freeStorage > avalibleEnergy){
                    creep.memory.sourceQuelle = 'source';
                }
            }
        }

    },

    // returns an object with the data to spawn a new creep
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
        
        let name = 'upgrader' + Game.time;
        let body = bodyParts.map(item => Array(item[0]).fill(item[1])).flat();
        let memory = {role: 'upgrader', changedRole: false, building: false, sourceSpot: targetId, sourceQuelle: 'source'};
        
        return {name, body, memory};
    }
};

module.exports = upgrader;