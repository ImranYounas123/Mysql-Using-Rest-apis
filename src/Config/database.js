const mongoose = require("mongoose")

exports.dbConnectivity = async(dbURl) => {
    await mongoose.connect(dbURl).then((db) => {
        console.log(`Db connected with host ${db.connection.host}`)
    }).catch((err) => {
        console.log(`Db not connect Error find => ${err.message}`)
    })
}