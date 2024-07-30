const { Schema, Types } = require('mongoose');
// Import the function to format timestamp
const formatTimestamp = require('../utils/functions.js')

// Schema for reactions

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: timestamp => formatTimestamp(timestamp) }
},
    {
        toJSON: {
            // set getters to true, to execute formatTimestamp function
            getters: true,
        },
    });

module.exports = reactionSchema;