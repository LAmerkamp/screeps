Creep.prototype.transferEnergy = function transferEnergy(target) {
    console.log("target: " + target);
    if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
}