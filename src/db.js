const { MongoClient } = require('mongodb')

let dbConnection
// let uri = 'mongodb+srv://lucaslegui21:37530791lukas@barbershop.9ixfa1q.mongodb.net/?retryWrites=true&w=majority'
// mongodb://localhost:27017/products/

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/aukany2')
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch((err) => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}