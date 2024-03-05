Spawn.prototype.setSourceSelection = function setSourceSelection(a){
    if(a < this.memory.roomSources.length){
        if (a == 2){ //Diese Abfrage ist nur um dem die bewachte source zu ignorieren
            this.memory.sourceSelection = 3;
        } else {
            this.memory.sourceSelection = a;
        }
        
    }else {
        this.memory.sourceSelection = 0;
    }
}