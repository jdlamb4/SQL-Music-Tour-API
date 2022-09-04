const DB = require('../models/index')

DB.sequelize.sync({force: true}).then(async function() {


    await DB.Band.create({
        name: 'test_band_1',
        genre: 'super cool',
        available_start_time: "2022-08-31 19:00:00",
        end_time: "2022-09-01 00:00:00"
    })

    await DB.Event.create({
        name: 'Lollapalooza',
        date: "2022-08-31",
        start_time: "2022-08-31 10:00:00",
        end_time: "2022-09-01 00:00:00"

    })

    await DB.Meet_Greet.create({
        event_id: 1,
        band_id: 1,
        meet_start_time: "2022-08-31 11:00:00",
        meet_end_time: "2022-08-31 13:00:00"
    })
    
    await DB.Stage.create({
        stage_name: 'Main-Stage'
    })

    await DB.Stage_Events.create({
        stage_id: 1,
        event_id: 1
    })
    
    await DB.Set_Time.create({
        event_id: 1,
        stage_id: 1,
        band_id: 1,
        start_time: "2022-08-31 20:00:00",
        end_time: "2022-09-01 00:00:00"
    })

})