const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Abhinav', {
    host: 'localhost',
    dialect: 'postgres'
});

const Movie = sequelize.define('Movie', {
    movieId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER
    },
    length: {
        type: DataTypes.STRING
    },
    actor:
         {
             type: DataTypes.STRING 
           }
}, {
    tableName: "movies",
    underscored: true,
    timestamps: false
});

// `sequelize.define` also returns the model
console.log(Movie === sequelize.models.Movie); // true

module.exports = Movie;