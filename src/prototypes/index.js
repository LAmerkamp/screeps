let files = {
    //Creep
    storeEnergy: require("./creep_actions/store_energy"),
    harvesting: require("./creep_actions/harvesting"),
    upgradingController: require("./creep_actions/upgrading_controller"),
    upgeradeContollerOrBuild: require('./creep_actions/build_constructions'),
    changeRole: require('./creep_actions/change_role'),
    takeEnergyFromSpawn: require('./creep_actions/take_enegy_from_spawn'),

    //Spawn
    getRoomSources: require('./spawn_actions/get_room_sources'),
    getRoomHarvestingSpots: require('./spawn_actions/get_room_harvesting_spots'),
    getTotalFreeHarvestingSpots: require('./spawn_actions/get_total_room_harvesting_spots'),
    setSourceSelection: require('./spawn_actions/set_source_selection'),
    buildStronghold: require('./spawn_actions/build_stronghold')
}