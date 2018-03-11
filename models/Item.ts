import { Model } from '../types/models';
import * as Sequelize from 'sequelize';

const { STRING } = Sequelize;

const ItemModel: Model = {
    Name: 'Item',
    Properties: {
        name: {
            type: STRING,
            allowNull: false
        },
    },
    Init({ Item, Category, Photo }){
        Item.hasMany(Photo);
        Item.belongsToMany(Category,{ through: 'ItemCategory' });
    }
}

export default ItemModel;