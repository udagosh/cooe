import './loadEnv.js'
import { MongoClient, ServerApiVersion } from 'mongodb'



const uri =
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.4mu1abz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function connect() {

    // connecting to the datajbase
    try {
        await client.connect()
        console.info("database connected")

        process.on('SIGTERM', async () => {
            console.log('Received SIGTERM, closing database connection...');
            await client.close();
            console.log('Database connection closed.');
            process.exit(0);
        });

        process.on('SIGINT', async () => {
            console.log('Received SIGTERM, closing database connection...');
            await client.close();
            console.log('Database connection closed.');
            process.exit(0);
        });

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}


export default connect
export { client }
