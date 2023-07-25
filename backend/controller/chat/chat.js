const STATUS_CODE = require("../../constants/statusCode");
const ChatModel = require("../../model/conservations");
const MessagesModel = require("../../model/message");
const userModel = require("../../model/user");
exports.createChat = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ statusCode: STATUS_CODE.BAD_REQUEST, msg: "Id is required" });
        return;
    }
    let name = req.body.name;
    let members = [id, req.user._id];
    let isExist = await ChatModel.findOne({ members });
    if (isExist) {
        res.status(STATUS_CODE.OK).json({ statusCode: STATUS_CODE.OK, msg: "Chat fetched successfully" });
        return;
    }

    let data = new ChatModel({ name, members });
    await data.save();
    res.status(STATUS_CODE.OK).json({ statusCode: STATUS_CODE.OK, msg: "Chat created successfully" });
    return;
}

exports.getAllChatsOfUser = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ statusCode: STATUS_CODE.BAD_REQUEST, msg: "Id is required" });
        return;
    }
    let chats = await ChatModel
        .find({ members: { $all: [id] } })
        .populate("members")
        .populate({
            path: "lastMessage", options: {
                sort: { _id: -1 },
            }
        })

    chats = chats.sort((a, b) => ((b.lastMessage?.createdAt || 0) - (a.lastMessage?.createdAt || 0)));


    res.status(STATUS_CODE.OK).json({ statusCode: STATUS_CODE.OK, msg: "Chat fetched successfully", data: chats });
    return;
}


exports.deleteChat = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ statusCode: STATUS_CODE.BAD_REQUEST, msg: "Id is required" });
        return;
    }
    const chats = await ChatModel.deleteOne({ _id: id });
    res.status(STATUS_CODE.OK).json({ statusCode: STATUS_CODE.OK, msg: "Chat fetched successfully", data: chats });
    return;
}


exports.getAllChatMessages = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ statusCode: STATUS_CODE.BAD_REQUEST, msg: "Id is required" });
        return;
    }
    const chats = await MessagesModel.find({ conversationId: id }).populate("conversation")
    res.status(STATUS_CODE.OK).json({ statusCode: STATUS_CODE.OK, msg: "Chat fetched successfully", data: chats });
    return;
}

exports.readAll = async (req, res) => {
    let conversationId = req.params.id;
    if (!conversationId) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ statusCode: STATUS_CODE.BAD_REQUEST, msg: "Id is required" });
        return;
    }
    await MessagesModel.updateMany({ conversationId, status: {$not: {$eq: 4}}, sentBy: {$not: {$eq: req.user.id}} });
    res.status(STATUS_CODE.OK).json({ statusCode: STATUS_CODE.OK, msg: "All unread messages are markes as read" });
    return;
}