//tutorial https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/
const { MongoClient } = require('mongodb');

async function main(){
    const uri = "mongodb+srv://lydiagraveline20:huffpuff123@cluster1.4ht5yiw.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    try {
        await client.connect();

        await listDatabases(client);
    } catch {
        console.error(e);
    } finally{
        await client.close();
    }
}

// call the function
main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}