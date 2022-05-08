const { MongoClient } = require("mongodb")

async function main(){

    const url = "mongodb://localhost:27017/nodeApplicationDB";
 
    const client = new MongoClient(url);
 
    try {
        await client.connect(function(err,db) {
            db.collction("Users").inserOne({
                    name : "ggggg",
                    age : 17 
            });
        });
       
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);