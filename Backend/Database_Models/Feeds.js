import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
   userId: {
           type: mongoose.Schema.Types.ObjectId,
           required: true,
       },
    caption: {
        type: String,
        required: true,
    },

    Img: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Feeds", FeedSchema);
