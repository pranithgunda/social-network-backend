const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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
});

// Initialize user model
const User = model('user', userSchema);

module.exports = User;