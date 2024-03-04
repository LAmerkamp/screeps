var starter = {
    /** @param {Creep} creep **/
    run: function (creep) {

        /*var upgraders = _.filter(Game.creeps, (ce) => ce.memory.role == 'upgrader');
        if(upgraders.length == 1){
            var sameTargetCreep = _.filter(Game.creeps, (c) => (c.memory.role == 'starter'  || (c.memory.role == 'upgrader' && c.memory.changedRole) ) && c.memory.resourceSpot == creep.memory.resourceSpot);
            if(sameTargetCreep.length == 2){
                sameTargetCreep[0].changeRole('upgrader', true);
            }
        }*/

        if(creep.store.getFreeCapacity() > 0) {
            creep.harvesting();
        }
        else {
            var target = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_CONTAINER)
                    && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                
                }
            });
            
            if(target.length > 0){
                creep.transferEnergy(target[0]);
            } else if (creep.store[RESOURCE_ENERGY] != 0){
                creep.changeRole('upgrader', true);
            }
            
        }
    },

    spawnData: function(room) {
        var starter = _.filter(Game.creeps, (c) => c.memory.role == 'starter' || (c.memory.role == 'upgrader' && c.memory.changedRole));
        var target = room.find(FIND_SOURCES);
        var targetId = "fakeID";

        for(var i = 0; i < starter.length; i++){
            for(var n = 0; n < target.length; n++){
                if(starter[i].memory.resourceSpot == target[n].id){
                    target.splice(n, 1);
                }
            } 
        }
        if(target.length > 0){
            targetId = target[0].id;
        }
        /* if(starter.length == 1){
            targetId = starter[0].memory.resourceSpot;
        } */

        let name = 'starter' + Game.time;
        let body = [WORK, CARRY, MOVE];
        let memory = {role: 'starter', changedRole: false, building: false, resourceSpot: targetId};
    
        return {name, body, memory};
    }
};

module.exports = starter;