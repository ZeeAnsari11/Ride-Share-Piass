const mongoose = require("mongoose");
const MessagesSchema = mongoose.Schema({
    conversationId: {
        type: String,
        required: [true, "conversationId is required"]
    },
    fullName: {
        type: String,
        required: [true, "fullName is required"]
    },
    sentBy: {
        type: String,
        required: [true, "sentBy is required"]
    },
    message: {
        type: String,
        required: [true, "message is required"]
    },
    // 1 ==> pending, 2 ==> sent, 3===> delivered, 4===> read
    status: {
        type: Number,
        enum: {
            values: [1, 2, 3, 4],
            message: "messageType must be 1, 2, 3, 4"
        },
        
    },
    // 1 ==> Text, 2===> Image, 3===> Video, 4===> Audio, 5==>General Note
    messageType: {
        type: Number,
        enum: {
            values: [1, 2, 3, 4, 5],
            message: "messageType must be 1, 2, 3, 4, 5"
        },
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

MessagesSchema.virtual("conversation", {
    ref: "conversation",
    localField: "conversationId",
    foreignField: "_id",
    justOne: true,
});

const MessagesModel = mongoose.model("message", MessagesSchema);
module.exports = MessagesModel;