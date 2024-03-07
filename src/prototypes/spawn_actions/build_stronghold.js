Spawn.prototype.buildStronghold = function buildStronghold(){
    if(!this.memory.strongholdPattern){
        console.log("Es ist keine Stronghold gesetzt");
    } else {
        var numberOfExtensions = 5;
        var pattern = this.memory.strongholdPattern;
        for(var i = 0; i < pattern.length; i++){
            
            switch(pattern[i][2]) {
                case 0:
                    break;
                case 1:
                    /* var numberOfExtensions = this.room.find(FIND_MY_STRUCTURES, {
                        filter: (e) => {
                            e.structureType == STRUCTURE_EXTENSION;
                        }
                    }); */
                    
                    if(numberOfExtensions > 0){
                        this.room.createConstructionSite(pattern[i][0], pattern[i][1], STRUCTURE_EXTENSION);
                        this.memory.strongholdPattern[i][2] = 0; 
                        numberOfExtensions--; 
                    }
                    
                    break;
                case 2:
                    if(this.room.controller.level == 3){
                        this.room.createConstructionSite(pattern[i][0], pattern[i][1], STRUCTURE_ROAD);
                        this.memory.strongholdPattern[i][2] = 0;
                    }
                    break;
                case 3:
                    if(this.room.controller.level == 3){
                        this.room.createConstructionSite(pattern[i][0], pattern[i][1], STRUCTURE_CONTAINER);
                        this.memory.strongholdPattern[i][2] = 0;
                    }
                    
                    break; 
                   
            }  
        }
        
    }
}