

import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DB_URL;

let client;
export const connectToMongoDB = () => {
    // MongoClient.connect(process.env.DB_URL)
    MongoClient.connect(url)
        .then(clientInstance => {
            client = clientInstance
            console.log("MongoDB is connected");
            createCounter(client.db());
            createIndexes(client.db());
        })
        .catch(err=> {
            console.log(err);
        })
}

export const getDB = () => {
    return client.db();
}