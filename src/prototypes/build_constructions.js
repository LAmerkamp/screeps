Creep.prototype.buildConstactions = function buildConstactions(target){
    if (this.build(target[0] == ERR_NOT_IN_RANGE)){
        this.moveTo(target[0]);
    }
}