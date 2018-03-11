
import { get } from 'lodash';
import * as express from 'express';
import { Models, Model } from '../types/models';
const { Router } = express;

type Middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => any | Promise<any>


export default function LoadController(modelInstances: Models){
    const router = Router();
    for (let [name, model] of Object.entries(modelInstances)) {

        router.get(`/${name.toLowerCase()}`, async function(req, res, next){
            try {
                const data = await model.findAll();
                res.send(data);
            } catch(e) {
                next(e);
            }
        });
        router.post(`/${name.toLowerCase()}`, async function(req, res, next){
            const payload = req.body;
            let options = {};
            const includes = get(req,'params.include',[]);
            try {
                const data = await model.create(payload);
                res.send(data);
            } catch(e) {
                next(e);
            }
        });
        router.patch(`/${name.toLowerCase()}`, async function(req, res, next){
            const payload = req.body;
            let options = {};
            try {
                const data = await model.update(payload, { where: {id: payload.id } });
                res.send(data);
            } catch(e) {
                next(e);
            }
        });

    }

}