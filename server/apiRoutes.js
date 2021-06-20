const express = require('express');

const movieRoutes = require('./movies/moviesRoutes');

const apiRouter = express.Router();

module.exports = () =>
    apiRouter.use('/movie', movieRoutes());
    //apiRouter.use('/tvchannel',tvchannelRoutes()); // if we have tvchannel in place of '/movie/
  
