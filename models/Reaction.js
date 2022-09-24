const { Schema, model, Types } = require('mongoose')

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
const Reaction = model('Reaction', reactionSchema)

module.exports = Reaction;