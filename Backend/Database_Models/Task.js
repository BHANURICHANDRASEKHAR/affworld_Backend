import mongoose from "mongoose";

const Task = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    TaskName: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    TaskCreate: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Task", Task);
