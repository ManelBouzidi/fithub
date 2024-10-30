const {DataTypes} = require('sequelize');

module.exports = (connect, DataTypes) => {
    const user = connect.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin'],
            defaultValue: 'user'
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false,
    })
    return user
}
