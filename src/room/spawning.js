let creepLogic = require("../creeps/index");
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {
    // lists all the creep types to console
    _.forEach(creepTypes, type => console.log(type));

    // get the data for spawning a new creep of creepTypeNeeded
    let creepSpawnData;
    let spawnStage = 1;

    var enemyTarget = room.find(FIND_HOSTILE_CREEPS);
    if(enemyTarget > 0){
        
    }

    else if(spawnStage == 1){
        var starter = _.filter(Game.creeps, (c) => (c.memory.role == 'starter' && c.room.name == room.name) 
            || (c.memory.role == 'upgrader' && c.memory.changedRole == true && c.room.name == room.name));

        var upgrader = _.filter(Game.creeps, (c) => (c.memory.role == 'upgrader' && c.room.name == room.name) || (c.memory.role == 'starter' && c.memory.changedRole == true && c.room.name == room.name));

        if(starter.length < room.find(FIND_SOURCES).length && starter.length <= upgrader.length) {
            creepSpawnData = creepLogic['starter'] && creepLogic['starter'].spawnData(room);
        }else if (upgrader.length < room.find(FIND_SOURCES).length) {
            creepSpawnData = creepLogic['upgrader'] && creepLogic['upgrader'].spawnData(room);
        }
    }

    /* console.log(room, JSON.stringify(creepSpawnData)); */

    if (creepSpawnData) {
        // find the first or 0th spawn in the room
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});
    
        console.log("Tried to Spawn:", 'starter', result)
    }
}

module.exports = spawnCreeps;