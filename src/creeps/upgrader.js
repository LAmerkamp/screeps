var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.say('harvesting');
            creep.memory.building = false;
            
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.say('upgrade');
            creep.memory.building = true;
        }

        if(creep.memory.building){
            /* var constructionTarget = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(constructionTarget.length > 0){
                creep.upgeradeContollerOrBuild(constructionTarget[0]);
            } else {
                creep.upgradingController();
            } */
            creep.upgeradeContollerOrBuild();
            
        }else {
            creep.harvesting();
        }
        
        var avalibleEnergy = Game.rooms[creep.room.name].energyAvailable;
        var maxStorage = Game.rooms[creep.room.name].energyCapacityAvailable;
        var freeStorage = maxStorage - avalibleEnergy;

        console.log("avalibleEnergy: " + avalibleEnergy);
        console.log("maxStorage: " + maxStorage);
        console.log("freeStorage: " + freeStorage);
        if((avalibleEnergy < maxStorage /* maxStorage/10 < freeStorage || avalibleEnergy <= 300 */) && creep.memory.changedRole){
            creep.memory.building = false;
            creep.memory.changedRole = false;
            creep.memory.role = 'starter';
        }

    },

    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Upgrader' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'upgrader', changedRole: false, building: false};
        
            return {name, body, memory};
    }
};

module.exports = roleUpgrader;