const { Thought } = require('../models')

const thoughtController = {
  
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No User with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  // GET ALL THOUGHTS
  getAllThought(req, res) {
    Thought.find({})
    .populate({path: 'reaction', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch( err => {
      console.log(err);
      res.status(500).json(err)
    })
  },
  // Get thought by ID
  getThoughtById({params}, res) {
    Thought.findOne({_id: params._id}) 
    .populate({path: 'reaction', select: '-__v'}
    .select('-__v'))
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({message: 'No thought with this ID'})
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  },
  deleteThought({params}, res) {
    Thought.findOneAndDelete({_id: params._id})
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({message: 'No thought with this ID'})
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },

  updateThought({ params, body}, res) {
    Thought.findOneAndUpdate({_id: params._id}, body, {new: true, runValidators: true})
    .populate({path: 'reaction', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).josn({message: 'No thought with this ID'})
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      res.status(500).json(err)
    }) 
  },

  addReaction({params, body}, res) {
    Thought.findOneAndUpdate({_id:params.thoughtId}, {$push: {reaction: body}}, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
    if (!dbThoughtData) {
        res.status(404).json({message: 'No thoughts with this ID'});
        return;
    }
    res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err))
  },

  deleteReaction({params}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reaction: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thoughts with this ID'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  }
}

module.exports = thoughtController;
