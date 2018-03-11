import * as express from 'express';
import Controllers from './controllers';
import * as promise from 'bluebird';
import db from './db';

async function start(){

    while (true) {
        try {
            await db.authenticate();
            break;
        } catch(e) {
            console.error('Could not connect to db... retrying');
            await promise.delay(1000);
        }
    }

    const app = express();

    app.use(Controllers);

    app.listen(3000,()=>console.log('Server started on :3000'));


}

