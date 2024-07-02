import mongoose from "mongoose";

const notSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },deadline: {
         type: Date
    },
    isCompleted:{
        type: Boolean,
        default: false 
    }
},
{ timestamps: true }
);

export default mongoose.model("notes", notSchema);