const { Schema, model } = require('mongoose');

// Schema for users

const userSchema = new Schema({
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
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format'
        }
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
},
    {
        toJSON: {
            // set virtuals to true, to return virtual property
            virtuals: true,
        },
        // set id to false, so id will not be repeated
        id: false,
    });

// Virtual property friendCount, to get count of friends for a given user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

// Initialize user model
const User = model('user', userSchema);

module.exports = User;