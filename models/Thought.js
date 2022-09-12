const { Schema, model, Types } = require('mongoose')
const moment = require('moment')

const reactionSchema = new Schema( 
    {
        reactionId: {
            // Use Mongoose's ObjectId data type
            type: Schema.Types.ObjectId,
            //Default value is set to a new ObjectId

            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280,            
        },
        username: {
            type: String,
            reqiured: true
        },
        createdAt: {
            type: Date,
            // Default value to current time stamp
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtSchema = new Schema( 
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        // These are like replies
        reaction: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;