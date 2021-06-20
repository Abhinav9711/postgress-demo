const moment = require('moment');
const { isEmpty } = require("lodash");
const { Op } = require("sequelize");

const { Movie } = require('../../model');


const createNewMovie = async (req, res) => {
    const { title, year, length, actor } = req.body;

    const movieId = `MV-${moment().unix()}`;
    const movieRecord = {
        movieId,
        title,
        year,
        length,
        actor
    }
    const result = await Movie.create(movieRecord);
    console.log(result.toJSON());

    if (!isEmpty(result)) {
        res.send(result);
    } else {
        res.send({ error: "Movie creations Failed" });
    }
}


const listMovies = async (req, res) => {
    
    const movies = await Movie.findAll();

    // To convert sequelize model to plain javascript
    const formattedMovie = movies.map(m => m.get({ plain: true }));

    if (!isEmpty(formattedMovie)) {
        res.send(formattedMovie);
    } else {
        res.send({ error: "Movie creations Failed" });
    }
}


const searchMovie = async(req,res) => {
        const movieId = req.params.id;
        const searchResult = await Movie.findAll({
         where : {
             movieId :{
                    [Op.like]: movieId
                     }
                },
         raw: true
     })
console.log(searchResult);
if(isEmpty(searchResult))
    res.send({message:"No records found with given movieid"});

   res.send(searchResult);
}


const deleteMovie = async(req,res) => {
const movieId= req.params.id;
const deletedResult = await Movie.destroy({
    where: {
            movieId : movieId
           },
          raw :true

}).then(function(rowDeleted)
   {
        // rowDeleted will return number of rows deleted
    if(rowDeleted === 1){
           console.log("Deleted successfully");
           res.send({message:"record deleted successfully"}); 
        }
    else 
      {
        console.log("Cannot be deleted");
     res.send({message :"record can not be deleted"});
    }
})
}


const updateMovie = async(req,res)=> {
    const movieId = req.params.id;
    const { title, year, length, actor } = req.body;
    const data=req.body;
    const updateResult = await Movie.update(data,{ 
      
        where: {
                 movieId: movieId
              }
      });

if(isEmpty(updateResult))
  {
      console.log("movieId not found");
      res.send({message:"movieId is invalid"});
  }
  else 
  {
    console.log("updated successfully");
    res.send({message:"updated successfully"});
  }
} 

module.exports = {
    createNewMovie,
    listMovies,
    searchMovie,
    deleteMovie,
    updateMovie
    
}