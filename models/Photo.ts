import { Model } from '../types/models';
import * as Sequelize from 'sequelize';

const { STRING } = Sequelize;

const PhotoModel: Model = {
    Name: 'Photo',
    Properties: {
        url: {
            type: STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
    },
}

export default PhotoModel;