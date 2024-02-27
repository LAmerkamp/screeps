var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0){
            creep.say("harvester");
            creep.memory.building = false;
        }

        if(!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.say("upgrade");
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            var constructionTarget = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(constructionTarget.length > 0){
                if(creep.build(constructionTarget[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(constructionTarget[0]);
                }
            } else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        
        var avalibleEnergy = Game.rooms[creep.room.name].energyAvailable;
        var maxStorage = Game.rooms[creep.room.name].energyCapacityAvailable;
        var freeStorage = maxStorage - avalibleEnergy;

        console.log("avalibleEnergy: " + avalibleEnergy);
        console.log("maxStorage: " + maxStorage);
        console.log("freeStorage: " + freeStorage);
        if((maxStorage/10 < freeStorage || avalibleEnergy <= 300) && creep.memory.changedRole){
            creep.memory.building = false;
            creep.memory.changedRole = false;
            creep.memory.role = 'harvester';
        }
        
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.name);
        console.log('Upgraders: ' + upgraders.length, room.name);

        if (upgraders.length < 2) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Upgrader' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'upgrader', building: false, changedRole: false};
        
            return {name, body, memory};
    }
};

module.exports = roleUpgrader;