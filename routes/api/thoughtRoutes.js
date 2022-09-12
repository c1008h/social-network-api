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

router.route('/')
.get(getAllThought)
.post(createThought)

router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought); 

router.route('/:thoughtId/reaction')
.post(addReaction);

router.route('/:thoughtId/reaction/:reactionId')
.delete(deleteReaction);

module.exports = router;