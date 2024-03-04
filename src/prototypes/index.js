let files = {
    storeEnergy: require("./store_energy"),
    harvesting: require("./harvesting"),
    upgradingController: require("./upgrading_controller"),
    upgeradeContollerOrBuild: require('./build_constructions'),
    changeRole: require('./change_role'),

    //Spawn
    getRoomSources: require('./spawn_actions/get_room_sources'),
    getRoomHarvestingSpots: require('./spawn_actions/get_room_harvesting_spots'),
    getTotalFreeHarvestingSpots: require('./spawn_actions/get_total_room_harvesting_spots')
}