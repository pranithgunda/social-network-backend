const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
// Import the function to format timestamp
const formatTimestamp = require('../utils/functions.js')


// Schema for thoughts

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default:Date.now, get:timestamp => formatTimestamp(timestamp) },
    username: { type: String, required: true },
    reactions: [Reaction],
},
    {
        toJSON: {
            // set virtuals to true, to return virtual property
            virtuals: true,
            // set getters to true, to execute the formatTimestamp function
            getters:true,
        },
        // set id to false, so id will not be repeated
        id: false,
    });

// Virtual property reactionCount, to get the count of reactions for a given thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


// Initialize our thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;


