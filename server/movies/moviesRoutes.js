
const Router = require('express-promise-router');
const controller = require('./moviesController');

module.exports = () => {
    const router = Router({ mergeParams: true });
    router.route('/list').get(controller.listMovies);
    router.route('/search/:id').get(controller.searchMovie);
    router.route('/create').post(controller.createNewMovie);
    router.route('/delete/:id').delete(controller.deleteMovie);
    router.route('/update/:id').put(controller.updateMovie);



    return router;
}