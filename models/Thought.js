const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema for thoughts

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [Reaction]
});

// Initialize our thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;


