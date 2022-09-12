const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Must match a valid email address 
            //(look into Mongoose's matching validation)
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        // Array of _id values referencing the Thought model
        thought: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        // Array of _id values referencing the User model (self-reference)
        friend: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)
userSchema.virtual('friendCount').get(function() {
    return this.friend.length
})

const User = model('User', userSchema)

module.exports = User;