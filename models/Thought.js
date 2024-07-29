const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// Schema for reactions

const reactionSchema = new Schema({
    reactionId:{
        type:Schema.Types.ObjectId,
        default:()=> new mongoose.Types.ObjectId()
    },
    reactionBody:{type:String, required:true, maxLength:280},
    username:{type:String, required:true},
    createdAt:{type:Date, default: Date.now}
});

// Schema for thoughts

const thoughtSchema = new Schema({
    thoughtText:{type:String, required:true, minLength:1, maxLength:280},
    createdAt:{type:Date,default:Date.now},
    username:{type:String,required:true},
    reactions:[{
        type:Schema.Types.ObjectId,
        ref:reactionSchema
    }]
});

// Initialize our thought model
const Thought =  model('thought',thoughtSchema);

module.exports = Thought;


