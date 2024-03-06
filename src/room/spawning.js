let creepLogic = require("../creeps/index");
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {
    // lists all the creep types to console
    //_.forEach(creepTypes, type => console.log(type));
    
    let spawn = room.find(FIND_MY_SPAWNS)[0];
    
    if (!spawn.memory.actionExecuted) {
        setSpawnMemory(spawn);
        spawn.memory.isSpawningCreep = null;
        spawn.memory.actionExecuted = true;
        spawn.buildStronghold();
    }

    let creepSpawnData;
    let spawnStage = spawn.memory.spawnStage;

    /* var enemyTarget = spawn.room.find(FIND_HOSTILE_CREEPS);
    if(enemyTarget.length > 0){
        spawnStage = 1;
    } */
    
    if(spawnStage == 0){
        var basicHarvestes = _.filter(Game.creeps, (c) => (c.memory.role == 'basicHarveste' && c.room.name == room.name || c.memory.role == 'upgrader' && c.memory.changedRole && c.room.name == room.name) && c.memory.sourceSpot == spawn.memory.roomSources[spawn.memory.sourceSelection].id); 
        var upgrader = _.filter(Game.creeps, (c) => (c.memory.role == 'upgrader' && c.room.name == room.name) && c.memory.sourceSpot == spawn.memory.roomSources[spawn.memory.sourceSelection].id);

        if(basicHarvestes.length < spawn.memory.roomSources[spawn.memory.sourceSelection].freeHarvestingSpots) {
            creepSpawnData = creepLogic['basicHarveste'] && creepLogic['basicHarveste'].spawnData(spawn);
        } else if (upgrader.length < 0) {
            creepSpawnData = creepLogic['upgrader'] && creepLogic['upgrader'].spawnData(spawn);
        }

        if(basicHarvestes.length + upgrader.length >= spawn.memory.roomSources[spawn.memory.sourceSelection].freeHarvestingSpots+1){
            spawn.setSourceSelection(spawn.memory.sourceSelection+1);
        }
    }

    if(spawnStage == 1){
        creepSpawnData = creepLogic['attacker'] && creepLogic['attacker'].spawnData(spawn);
    }

    spawn.memory.isSpawningCreep = creepSpawnData; 

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