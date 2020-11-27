const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model { }

module.exports = {
    init: (sequelize) => {
        User.init({
            // Model attributes are defined here
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            passwordHash: {
                type: DataTypes.STRING
            },
            authProvider: {
                type: DataTypes.STRING,
                defaultValue: 'local', // 'google', 'facebook', etc..
                allowNull: false
            },
            authProviderId: {
                type: DataTypes.STRING
            },
        }, {
            sequelize: sequelize,
            modelName: 'User',
            indexes: [
                {
                    unique: true,
                    fields: ['email']
                },
                {
                    unique: true,
                    fields: ['username']
                }
            ]
        });

    },
    model: User,
    createRelationships: (_) => {}
}