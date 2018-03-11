import { Model } from '../types/models';
import Sequelize from 'sequelize';

const { STRING } = Sequelize;

const ItemModel: Model = {
    Name: 'Item',
    Properties: {
        name: {
            type: STRING,
            allowNull: false
        },
    },
    Init({ Item, Category }){
        Item.belongsToMany(Category,{ through: 'ItemCategory' });
    }
}

export default ItemModel;