Spawn.prototype.buildStronghold = function buildStronghold(){
    if(!this.memory.strongholdPattern){
        console.log("Es ist keine Stronghold gesetzt");
    } else {
        var pattern = this.memory.strongholdPattern;
        for(var i = 0; i < pattern.length; i++){
            switch(pattern[i][2]) {
                case 0:
                    break;
                case 1:
                    this.room.createConstructionSite(pattern[i][0], pattern[i][1], STRUCTURE_EXTENSION);
                    break;
                case 2:
                    this.room.createConstructionSite(pattern[i][0], pattern[i][1], STRUCTURE_ROAD);
                    break;
                case 3:
                    this.room.createConstructionSite(pattern[i][0], pattern[i][1], STRUCTURE_STORAGE);
                    break;    
            }  
        }
        
    }
}