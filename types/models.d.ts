
import * as sequelize from "sequelize";

interface ModelMeta {
    _Meta: {
        Name: string
    }
}
type SuperModel = sequelize.Model<any,any> & ModelMeta;
interface Models {
    [ key: string ] : SuperModel 
}
type SuperModels = Models;

interface Model {
    Name: string,
    Properties: sequelize.DefineAttributes
    Init?: (Models: Models) => void
}