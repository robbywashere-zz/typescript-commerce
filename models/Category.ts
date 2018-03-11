import { Model } from '../types/models';
import * as Sequelize from 'sequelize';

const { STRING } = Sequelize;

const CategoryModel: Model = {
    Name: 'Category',
    Properties: {
        name: {
            type: STRING,
            allowNull: false
        },
    },
    Init({ Item, Category }){
        Category.belongsToMany(Item,{ through: 'ItemCategory' });
    }
}

export default CategoryModel;