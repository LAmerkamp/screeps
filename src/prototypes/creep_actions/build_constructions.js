Creep.prototype.upgeradeContollerOrBuild = function upgeradeContollerOrBuild(){
    var constructionTarget = this.room.find(FIND_CONSTRUCTION_SITES);
    if(constructionTarget.length > 0){
        if(this.build(constructionTarget[0]) == ERR_NOT_IN_RANGE){
            this.moveTo(constructionTarget[0]);
        }
    } else {
        this.upgradingController();
    }
}