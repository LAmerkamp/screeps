Spawn.prototype.getTotalFreeHarvestingSpots = function getTotalFreeHarvestingSpots(){
    let sum = 0;
    for(var i = 0; i < this.memory.roomSources.length; i++){
        sum += this.memory.roomSources[i].freeHarvestingSpots;
    }
    this.memory.totalFreeHarvestingSpots = sum;
}