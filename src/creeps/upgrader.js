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
            creep.changeRole('starter', false);
        }

    },

    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        //var starterResourceSpot = _.filter(Game.creeps.memory.resourceSpot, (creep) => creep.memory.role == 'starter');

        var target = room.find(FIND_SOURCES);
        var targetId = "fakeID";

        for(var i = 0; i < upgrader.length; i++){
            for(var n = 0; n < target.length; n++){
                if(upgrader[i].memory.resourceSpot == target[n].id){
                    target.splice(n, 1);
                }
            } 
        }
        if(target.length > 0){
            targetId = target[0].id;
        }

        let name = 'Upgrader' + Game.time;
        let body = [WORK, CARRY, MOVE];
        let memory = {role: 'upgrader', changedRole: false, building: false, resourceSpot: targetId};
        
        return {name, body, memory};
    }
};

module.exports = roleUpgrader;