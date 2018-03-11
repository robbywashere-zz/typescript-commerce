import { Model } from '../types/models';
import Sequelize from 'sequelize';

const { STRING } = Sequelize;

const UserModel: Model = {
    Name: 'User',
    Properties: {
        firstName: {
            type: STRING,
            allowNull: false
        },
        lastName: {
            type: STRING,
            allowNull: false
        },
        passwordHash: {
            type: STRING,
            allowNull: false
        },
        passwordSalt: {
            type: STRING,
            allowNull: false
        },
        email: {
            type: STRING,
            allowNull: false,
            validate: { 
                isEmail: true 
            }
        }
    },
}

export default ItemModel;