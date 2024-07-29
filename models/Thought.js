const {Schema, model} = require('mongoose');

// Schema for thoughts

const reactionSchema = new Schema({
    reactionId:{type:Schema.Types.ObjectId},
    reactionBody:{type:String,required:true,maxLength:280},
    username:{type:String,required:true},
    createdAt:{type:Date,default: Date.now}
});


