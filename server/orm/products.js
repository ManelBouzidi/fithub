const {DataTypes} = require('sequelize');

module.exports = (connect, DataTypes) => {
    const product = connect.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        images: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
      timestamps: false,
    });

    product.associate = (models) => {
        product.belongsTo(models.category, {
            foreignKey: 'categoryId',
            as: 'category'
        });
    };

    return product;
}
