var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
    },
    // checks if the room needs to spawn a creep
    //var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);

    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var target = room.find(FIND_SOURCES, {
            filter: (source) => {
                    source != harvesters.memory.resourceSpot;
            }
        });

        /* for(var i = 0; i < harvesters.length; i++){
            target = room.find(FIND_SOURCES, {
                filter: (source) => {
                        source != target[i].memory.resourceSpot;
                }
            });
            
        } */
        

        let name = 'Harvester' + Game.time;
        let body = [WORK, WORK, WORK, MOVE];
        let memory = {role: 'harvester', resourceSpot: ''};
        
         return {name, body, memory};
    }
};

module.exports = harvester;