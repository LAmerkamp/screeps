let creepLogic = require("../creeps/index");
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {
    // lists all the creep types to console
    _.forEach(creepTypes, type => console.log(type));


    // get the data for spawning a new creep of creepTypeNeeded
    let creepSpawnData;
    //let creepSpawnData = creepLogic['harvester'] && creepLogic['harvester'].spawnData(room);
    //let creepSpawnData = creepLogic['upgrader'] && creepLogic['upgrader'].spawnData(room);
    /* console.log(room, JSON.stringify(creepSpawnData)); */

    if (creepSpawnData) {
        // find the first or 0th spawn in the room
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});
    
        console.log("Tried to Spawn:", 'harvester', result)
    }
}

module.exports = spawnCreeps;