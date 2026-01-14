import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    }
},
{timestamps: true},
);

export default mongoose.model("blogs", blogSchema);