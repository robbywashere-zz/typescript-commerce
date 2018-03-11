import { readdirSync  } from 'fs'; 
import { Models, Model, SuperModel } from '../types/models';
import * as sequelize from "sequelize";
import db from '../db'

export function loadModelDefinitions(Sequelize: sequelize.Sequelize, directory:string = __dirname): Models {
    let ModelsMap : Models; 
    const files: Array<string> = readdirSync(directory)
    .filter( (path:string) => path.slice(0,5) !== "index" && path.slice(0,1) !== "_");

    const modelDefs: Array<Model> = files.map( path => require(path) );

    for (let def of modelDefs) {
        const { Properties, Name } = def;
        const instance = <SuperModel> Sequelize.define(Name, Properties);
        instance._Meta = { Name };
        ModelsMap[Name] = instance;
    }

    for (let def of modelDefs) {
        const { Name, Init } = def;
        if (Init) {
            Init(ModelsMap);
        }
    }
    return ModelsMap;
}

export default loadModelDefinitions(db);