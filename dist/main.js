/* This header is placed at the beginning of the output file and defines the
	special `__require`, `__getFilename`, and `__getDirname` functions.
*/
(function() {
	/* __modules is an Array of functions; each function is a module added
		to the project */
var __modules = {},
	/* __modulesCache is an Array of cached modules, much like
		`require.cache`.  Once a module is executed, it is cached. */
	__modulesCache = {},
	/* __moduleIsCached - an Array of booleans, `true` if module is cached. */
	__moduleIsCached = {};
/* If the module with the specified `uid` is cached, return it;
	otherwise, execute and cache it first. */
function __require(uid, parentUid) {
	if(!__moduleIsCached[uid]) {
		// Populate the cache initially with an empty `exports` Object
		__modulesCache[uid] = {"exports": {}, "loaded": false};
		__moduleIsCached[uid] = true;
		if(uid === 0 && typeof require === "function") {
			require.main = __modulesCache[0];
		} else {
			__modulesCache[uid].parent = __modulesCache[parentUid];
		}
		/* Note: if this module requires itself, or if its depenedencies
			require it, they will only see an empty Object for now */
		// Now load the module
		__modules[uid].call(this, __modulesCache[uid], __modulesCache[uid].exports);
		__modulesCache[uid].loaded = true;
	}
	return __modulesCache[uid].exports;
}
/* This function is the replacement for all `__filename` references within a
	project file.  The idea is to return the correct `__filename` as if the
	file was not concatenated at all.  Therefore, we should return the
	filename relative to the output file's path.

	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getFilename(path) {
	return require("path").resolve(__dirname + "/" + path);
}
/* Same deal as __getFilename.
	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getDirname(path) {
	return require("path").resolve(__dirname + "/" + path + "/../");
}
/********** End of header **********/
/********** Start module 0: C:\Users\lukas\Documents\screeps-starter-master\src\main.js **********/
__modules[0] = function(module, exports) {
let creepLogic = __require(1,0);
let roomLogic = __require(2,0);
let prototypes = __require(3,0);


module.exports.loop = function () {
    Game.myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my);
    _.forEach(Game.myRooms, r => roomLogic.spawning(r));
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        let role = creep.memory.role;
        if (creepLogic[role]) {
            creepLogic[role].run(creep);
        }
    }
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if(Memory.creeps[name].role == 'starter' || Memory.creeps[name].role == 'upgrader'){
              Game.spawns['Spawn1'].memory.blockedSourceSpot = Memory.creeps[name].resourceSpot;  
            }
            
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}
return module.exports;
}
/********** End of module 0: C:\Users\lukas\Documents\screeps-starter-master\src\main.js **********/
/********** Start module 1: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\index.js **********/
__modules[1] = function(module, exports) {
let creepLogic = {
    starter: __require(4,1),
    harvester: __require(5,1),
    upgrader: __require(6,1),
    attacker: __require(7,1)
}

module.exports = creepLogic;
return module.exports;
}
/********** End of module 1: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\index.js **********/
/********** Start module 2: C:\Users\lukas\Documents\screeps-starter-master\src\room\index.js **********/
__modules[2] = function(module, exports) {
let roomLogic = {
    spawning:     __require(8,2),
}

module.exports = roomLogic;
return module.exports;
}
/********** End of module 2: C:\Users\lukas\Documents\screeps-starter-master\src\room\index.js **********/
/********** Start module 3: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\index.js **********/
__modules[3] = function(module, exports) {
let files = {
    storeEnergy: __require(9,3),
    harvesting: __require(10,3),
    upgradingController: __require(11,3),
    upgeradeContollerOrBuild: __require(12,3),
    changeRole: __require(13,3)
}
return module.exports;
}
/********** End of module 3: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\index.js **********/
/********** Start module 4: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\starter.js **********/
__modules[4] = function(module, exports) {
var starter = {
    /** @param {Creep} creep **/
    run: function (creep) {

        /*var upgraders = _.filter(Game.creeps, (ce) => ce.memory.role == 'upgrader');
        if(upgraders.length == 1){
            var sameTargetCreep = _.filter(Game.creeps, (c) => (c.memory.role == 'starter'  || (c.memory.role == 'upgrader' && c.memory.changedRole) ) && c.memory.resourceSpot == creep.memory.resourceSpot);
            if(sameTargetCreep.length == 2){
                sameTargetCreep[0].changeRole('upgrader', true);
            }
        }*/

        if(creep.store.getFreeCapacity() > 0) {
            creep.harvesting();
        }
        else {
            var target = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_CONTAINER)
                    && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                
                }
            });
            
            if(target.length > 0){
                creep.transferEnergy(target[0]);
            } else if (creep.store[RESOURCE_ENERGY] != 0){
                creep.changeRole('upgrader', true);
            }
            
        }
    },

    spawnData: function(room) {
        var starter = _.filter(Game.creeps, (c) => c.memory.role == 'starter' || (c.memory.role == 'upgrader' && c.memory.changedRole));
        var target = room.find(FIND_SOURCES);
        var targetId = "fakeID";

        for(var i = 0; i < starter.length; i++){
            for(var n = 0; n < target.length; n++){

                console.log((" HIER!!!!: " + Game.spawns['Spawn1'].memory.blockedSourceSpot))
                if(starter[i].memory.resourceSpot == target[n].id || Game.spawns['Spawn1'].memory.blockedSourceSpot == target[n].id){
                    target.splice(n, 1);
                }
            } 
        }
        if(target.length > 0){
            targetId = target[0].id;
        }
        /* if(starter.length == 1){
            targetId = starter[0].memory.resourceSpot;
        } */

        let name = 'starter' + Game.time;
        let body = [WORK, CARRY, MOVE];
        let memory = {role: 'starter', changedRole: false, building: false, resourceSpot: targetId};
    
        return {name, body, memory};
    }
};

module.exports = starter;
return module.exports;
}
/********** End of module 4: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\starter.js **********/
/********** Start module 5: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\harvester.js **********/
__modules[5] = function(module, exports) {
var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
    },
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
return module.exports;
}
/********** End of module 5: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\harvester.js **********/
/********** Start module 6: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\upgrader.js **********/
__modules[6] = function(module, exports) {
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.say('harvesting');
            creep.memory.building = false;
            
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.say('upgrade');
            creep.memory.building = true;
        }

        if(creep.memory.building){
            creep.upgeradeContollerOrBuild();
        }else {
            creep.harvesting();
        }
        
        var avalibleEnergy = Game.rooms[creep.room.name].energyAvailable;
        var maxStorage = Game.rooms[creep.room.name].energyCapacityAvailable;
        var freeStorage = maxStorage - avalibleEnergy;

        if((avalibleEnergy < maxStorage /* maxStorage/10 < freeStorage || avalibleEnergy <= 300 */) && creep.memory.changedRole){
            creep.memory.building = false;
            creep.changeRole('starter', false);
        }

    },
    spawnData: function(room) {
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        var target = room.find(FIND_SOURCES);
        var targetId = "fakeID";

        for(var i = 0; i < upgrader.length; i++){
            for(var n = 0; n < target.length; n++){
                if(upgrader[i].memory.resourceSpot == target[n].id || Game.spawns['Spawn1'].memory.blockedSourceSpot == target[n].id){
                    target.splice(n, 1);
                }
            } 
        }
        if(target.length > 0){
            targetId = target[0].id;
        }

        let name = 'Upgrader' + Game.time;
        let body = [WORK, CARRY, MOVE];
        let memory = {role: 'upgrader', changedRole: false, building: false, resourceSpot: targetId};
        
        return {name, body, memory};
    }
};

module.exports = roleUpgrader;
return module.exports;
}
/********** End of module 6: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\upgrader.js **********/
/********** Start module 7: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\attacker.js **********/
__modules[7] = function(module, exports) {
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
        let body = [RANGED_ATTACK, MOVE];
        let memory = {role: 'attacker'};
    
        return {name, body, memory};
    }
};

module.exports = attacker;
return module.exports;
}
/********** End of module 7: C:\Users\lukas\Documents\screeps-starter-master\src\creeps\attacker.js **********/
/********** Start module 8: C:\Users\lukas\Documents\screeps-starter-master\src\room\spawning.js **********/
__modules[8] = function(module, exports) {
let creepLogic = __require(1,8);
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {
    _.forEach(creepTypes, type => console.log(type));
    let creepSpawnData;
    let spawnStage = 1;

    /* var enemyTarget = room.find(FIND_HOSTILE_CREEPS);
    
    if(enemyTarget.length > 0){
        creepSpawnData = creepLogic['attacker'] && creepLogic['attacker'].spawnData(room);
    } */

    if(spawnStage == 1){
        var starter = _.filter(Game.creeps, (c) => (c.memory.role == 'starter' && c.room.name == room.name) 
            || (c.memory.role == 'upgrader' && c.memory.changedRole == true && c.room.name == room.name));

        var upgrader = _.filter(Game.creeps, (c) => (c.memory.role == 'upgrader' && c.room.name == room.name) || (c.memory.role == 'starter' && c.memory.changedRole == true && c.room.name == room.name));

        if(starter.length < room.find(FIND_SOURCES).length && starter.length <= upgrader.length) {
            creepSpawnData = creepLogic['starter'] && creepLogic['starter'].spawnData(room);
        }else if (upgrader.length < room.find(FIND_SOURCES).length) {
            creepSpawnData = creepLogic['upgrader'] && creepLogic['upgrader'].spawnData(room);
        }
    }

    /* console.log(room, JSON.stringify(creepSpawnData)); */

    if (creepSpawnData) {
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});
    
        console.log("Tried to Spawn:", creepSpawnData.memory.role, result)
    }
}

module.exports = spawnCreeps;
return module.exports;
}
/********** End of module 8: C:\Users\lukas\Documents\screeps-starter-master\src\room\spawning.js **********/
/********** Start module 9: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\store_energy.js **********/
__modules[9] = function(module, exports) {
Creep.prototype.transferEnergy = function transferEnergy(target) {
    if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
}
return module.exports;
}
/********** End of module 9: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\store_energy.js **********/
/********** Start module 10: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\harvesting.js **********/
__modules[10] = function(module, exports) {
Creep.prototype.harvesting = function harvesting(){
    const target = Game.getObjectById(this.memory.resourceSpot);
    if(this.harvest(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
} 
return module.exports;
}
/********** End of module 10: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\harvesting.js **********/
/********** Start module 11: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\upgrading_controller.js **********/
__modules[11] = function(module, exports) {
Creep.prototype.upgradingController = function upgradingController(){
    if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
        this.moveTo(this.room.controller);
    }
}
return module.exports;
}
/********** End of module 11: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\upgrading_controller.js **********/
/********** Start module 12: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\build_constructions.js **********/
__modules[12] = function(module, exports) {
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
return module.exports;
}
/********** End of module 12: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\build_constructions.js **********/
/********** Start module 13: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\change_role.js **********/
__modules[13] = function(module, exports) {
Creep.prototype.changeRole = function changeRole(role, changeToSubRole){
    this.memory.role = role;
    this.memory.changedRole = changeToSubRole;
}
return module.exports;
}
/********** End of module 13: C:\Users\lukas\Documents\screeps-starter-master\src\prototypes\change_role.js **********/
/********** Footer **********/
if(typeof module === "object")
	module.exports = __require(0);
else
	return __require(0);
})();
/********** End of footer **********/
