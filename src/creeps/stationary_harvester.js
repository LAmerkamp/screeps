var stationaryHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
    },
    // checks if the room needs to spawn a creep
    //var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);

    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
        var stationaryHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'stationaryHarvester');
        var target = room.find(FIND_SOURCES, {
            filter: (source) => {
                    source != stationaryHarvesters.memory.sourceSpot;
            }
        });

        /* for(var i = 0; i < harvesters.length; i++){
            target = room.find(FIND_SOURCES, {
                filter: (source) => {
                        source != target[i].memory.sourceSpot;
                }
            });
            
        } */
        

        let name = 'stationaryHarvester' + Game.time;
        let body = [WORK, WORK, WORK, MOVE];
        let memory = {role: 'stationaryHarvester', sourceSpot: ''};
        
         return {name, body, memory};
    }
};

module.exports = stationaryHarvester;