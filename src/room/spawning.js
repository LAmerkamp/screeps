let creepLogic = require("../creeps/index");
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {
    // lists all the creep types to console
    //_.forEach(creepTypes, type => console.log(type));

    // get the data for spawning a new creep of creepTypeNeeded
    
    let spawn = room.find(FIND_MY_SPAWNS)[0];
    
    if (!spawn.memory.actionExecuted) {
        setSpawnMemory(spawn);
        spawn.memory.actionExecuted = true;
    }

    let creepSpawnData;
    let spawnStage = spawn.memory.spawnStage;
    
    if(spawnStage == 0){ //2.Generation werden nunoch upgrader gespawned BEHEBEN!
        var starter = _.filter(Game.creeps, (c) => ((c.memory.role == 'starter' && c.room.name == room.name) || (c.memory.role == 'upgrader' && c.room.name == room.name))
                && c.memory.sourceSpot == spawn.memory.roomSources[spawn.memory.sourceSelection].id); 
                
        if(starter.length < spawn.memory.roomSources[spawn.memory.sourceSelection].freeHarvestingSpots) {
            creepSpawnData = creepLogic['starter'] && creepLogic['starter'].spawnData(spawn);
        } else if (starter.length < spawn.memory.roomSources[spawn.memory.sourceSelection].freeHarvestingSpots+1) {
            creepSpawnData = creepLogic['upgrader'] && creepLogic['upgrader'].spawnData(spawn);
        }

        if(starter.length >= spawn.memory.roomSources[spawn.memory.sourceSelection].freeHarvestingSpots+1){
            spawn.setSourceSelection(spawn.memory.sourceSelection+1);
        }
    }

    /* console.log(room, JSON.stringify(creepSpawnData)); */

    if (creepSpawnData) {
        // find the first or 0th spawn in the room
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});
    
        console.log("Tried to Spawn:", creepSpawnData.memory.role, result)
    }
}

function setSpawnMemory(spawn){
        spawn.getRoomSources();
        for(var i = 0; i < spawn.memory.roomSources.length; i++){
            if(!spawn.memory.roomSources[i].freeHarvestingSpots){
                spawn.getRoomHarvestingSpots(Game.getObjectById(spawn.memory.roomSources[i].id));
            }
        }
        spawn.getTotalFreeHarvestingSpots();
        spawn.memory.spawnStage = 0;
        spawn.memory.sourceSelection = spawn.memory.roomSources.length > 0 ? 0 : null;
}

function checkSourceSelection(spawn){
    let creepSpawnData;
    
}

module.exports = spawnCreeps;