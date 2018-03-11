
import { get } from 'lodash';
import * as express from 'express';
import { Models, Model } from '../types/models';
const { Router } = express;

type Middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => any | Promise<any>


const lookup = function (name: string): Model | never {
    if (typeof this[name] === "undefined") {
        throw new Error(`Bad Request, ${name} relation does not exist`);
    } else {
        return this[name];
    }
}
export default function LoadController(modelInstances: Models) : express.Router {
    const router = Router();
    for (let [name, model] of Object.entries(modelInstances)) {

        const urlName = `/${name.toLocaleUpperCase()}`;
        router.get(urlName, async function(req, res, next){
            try {
                const data = await model.findAll();
                res.send(data);
            } catch(e) {
                next(e);
            }
        });
        router.post(urlName, async function(req, res, next){
            const payload = req.body;
            let options;
            try {
                const include = [].concat(get(req,'query.include',[]))//TODO: rethink this                    .map(lookup.bind(modelInstances));
                const data = await model.create(payload, { include });
                res.send(data);
            } catch(e) {
                next(e);
            }
        });
        router.delete(`${urlName}/:id`, async function(req, res, next){
            try { 
                const resource = await model.findById(req.params.id);
                if (resource) await resource.destroy();
                res.end();
            } catch(e) {
                next(e);
            }
        })
        router.patch(urlName, async function(req, res, next){
            const payload = req.body;
            try {
                const data = await model.update(payload, { where: { id: payload.id } });
                res.send(data);
            } catch(e) {
                next(e);
            }
        });

    }
    return router;
}