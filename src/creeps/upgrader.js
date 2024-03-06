var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var avalibleEnergy = Game.rooms[creep.room.name].energyAvailable;
        var maxStorage = Game.rooms[creep.room.name].energyCapacityAvailable;
        var freeStorage = maxStorage - avalibleEnergy;

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.say('harvesting');
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.say('upgrade');
            creep.memory.building = true;
        }

        if(creep.memory.building){
            if(creep.memory.changedRole && freeStorage > creep.store[RESOURCE_ENERGY]){
                creep.memory.building = false;
                creep.memory.storeEnergy = true;
                creep.changeRole('basicHarveste', false);
            }
            creep.upgeradeContollerOrBuild();
            if(creep.memory.sourceQuelle == 'structure' && (avalibleEnergy < 100 || creep.room.find(FIND_MY_SPAWNS)[0].memory.isSpawningCreep)){
                creep.memory.sourceQuelle = 'source';
            } else if (creep.memory.sourceQuelle == 'source' && freeStorage == 0 && !creep.room.find(FIND_MY_SPAWNS)[0].memory.isSpawningCreep){
                creep.memory.sourceQuelle = 'structure';
            }
        }else {
            if(creep.memory.sourceQuelle == 'source' || !creep.memory.sourceQuelle){
                creep.harvesting();
            }else if(creep.memory.sourceQuelle == 'structure'){
                creep.takeEnergyFromSpawn();
            }
            
        }

    },

    // returns an object with the data to spawn a new creep
    spawnData: function(spawn) {
        var targetId = spawn.memory.roomSources[spawn.memory.sourceSelection].id;

        var bodyParts = [
            [ 1, WORK ],
            [ 1, CARRY ],
            [ 1, MOVE ]
        ];
        
        let name = 'Upgrader' + Game.time;
        let body = bodyParts.map(item => Array(item[0]).fill(item[1])).flat();
        let memory = {role: 'upgrader', changedRole: false, building: false, sourceSpot: targetId, sourceQuelle: 'source'};
        
        return {name, body, memory};
    }
};

module.exports = roleUpgrader;