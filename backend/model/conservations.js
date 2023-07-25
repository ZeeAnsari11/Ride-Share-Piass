const mongoose = require("mongoose");
const ConversationsSchema = mongoose.Schema({
    name: {
        type: String,
        default: "Chat",
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId, mongoose.Schema.Types.ObjectId],
        ref: "user",
        required: [true, "Members are required"],
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

ConversationsSchema.virtual("memberDetails", {
    ref: "user",
    localField: "members",
    foreignField: "_id",
});

ConversationsSchema.virtual("lastMessage", {
    ref: "message",
    localField: "_id",
    foreignField: "conversationId",
    justOne: true,
});

const ConversationsModel = mongoose.model("conversation", ConversationsSchema);
module.exports = ConversationsModel;