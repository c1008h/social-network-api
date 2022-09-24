const router = require('express').Router();

const { 
    getAllThought, 
    getThoughtById, 
    updateThought, 
    deleteThought,
    createThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

router.route('/').get(getAllThought)

router.route('/').post(createThought)

router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought); 

router.route('/:id/reaction')
.post(addReaction);

router.route('/:id/reaction/:reactionId')
.delete(deleteReaction);

module.exports = router;