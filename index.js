const { MongoClient } = require('mongodb');

// TODO: valores por ENV
require('dotenv').config();
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbname = process.env.DB_NAME;
const host = process.env.DB_HOST;
const options = process.env.DB_OPT;
const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?${options}`;

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db( dbname );
        const animalesCollection = db.collection('animales');
        await animalesCollection.insert({nombre: "Chola"});
        const animales = await animalesCollection.find({});
        animales.forEach( console.dir )
    } finally {
        await client.close();
    }
}

run().catch( console.dir );
