var attacker = {
    /** @param {Creep} creep **/
    run: function (creep) {
        
        var enemyTarget = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if(enemyTarget.length > 0) {
            
            if(creep.rangedAttack(enemyTarget[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemyTarget[0]);
            }
        }   

    },

    spawnData: function(room) {
        let name = 'attacker' + Game.time;
        let body = [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE];
        let memory = {role: 'attacker'};
    
        return {name, body, memory};
    }
};

module.exports = attacker;