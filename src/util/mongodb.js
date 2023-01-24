import { MongoClient } from "mongodb";

const { MONGO_URI, MONGO_DB } = process.env

if (!MONGO_URI) {
    throw new Error("Please define mongodb uri in your env file")
}

if (!MONGO_DB) {
    throw new Error("Please define mongodb db in your env file")
}

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {

    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        // const opts = {
        //     maxPoolSize: 50,
        //     wtimeoutMS: 2500,
        //     useNewUrlParser: true
        // }
        cached.promise = MongoClient.connect(MONGO_URI).then((client) => {
            return {
                client,
                db: client.db(MONGO_DB)
            }
        })
    }

    cached.conn = await cached.promise
    return cached.conn

}