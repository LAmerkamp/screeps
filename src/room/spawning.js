let creepLogic = require("../creeps/index");
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {
    // lists all the creep types to console
    _.forEach(creepTypes, type => console.log(type));


    // get the data for spawning a new creep of creepTypeNeeded
    let creepSpawnData;
    let spawnStage = 1;
    if(spawnStage == 1){
        var harvester = _.filter(Game.creeps, (c) => (c.memory.role == 'harvester' && c.room.name == room.name) 
            || (c.memory.role == 'upgrader' && c.memory.changedRole == true && c.room.name == room.name));

        var upgrader = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader' && c.room.name == room.name);

        console.log("harvester: " + harvester.length + " - upgrader: " + upgrader.length);
        if(harvester.length < 2) {
            creepSpawnData = creepLogic['harvester'] && creepLogic['harvester'].spawnData(room);
        }else if (upgrader.length < 2) {
            creepSpawnData = creepLogic['upgrader'] && creepLogic['upgrader'].spawnData(room);
        }

    }
    
    //
    /* console.log(room, JSON.stringify(creepSpawnData)); */

    if (creepSpawnData) {
        // find the first or 0th spawn in the room
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});
    
        console.log("Tried to Spawn:", 'harvester', result)
    }
}

module.exports = spawnCreeps;