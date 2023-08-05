const roles = require("../../constants/roles");
const STATUS_CODE = require("../../constants/statusCode");
const userModel = require("../../model/user");
const saveFileToPublic = require("../../utils/saveFileToPublic");

exports.getById = async (req, res) => {
    let _id = req.params.id;
    if (!_id) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ msg: "Id is required.", statusCode: STATUS_CODE.BAD_REQUEST });
        return;
    }
    await userModel.findOne({ _id })
        .then(doc => {
            if (doc) {
                res.status(STATUS_CODE.OK).json({ data: doc, statusCode: STATUS_CODE.OK });
                return;
            }
            res.status(STATUS_CODE.NOT_FOUND).json({ msg: "Not found", statusCode: STATUS_CODE.NOT_FOUND });
        })
}

exports.submitProfileRequest = async (req, res) => {
    let fileAddresses = [];

    if (req.files && req.files[0]) {
        for (let file of req.files) {
            let fileAddress = saveFileToPublic({ ...file, originalname: "captured.jpeg" }, "images");
            fileAddresses.push(fileAddress);

        }
    }

    let doc = await userModel.updateOne({ _id: req.user._id }, {
        $set: {
            ...req.body,
            image: fileAddresses[0],
            cnicFront: fileAddresses[1] || "",
            cnicBack: fileAddresses[2] || "",
            requestStatus: "pending",
        }
    })
    if(doc.modifiedCount){
        res.json({ statusCode: 200, msg: "Profile Request submitted successfully" });
        return;
    }
    res.json({ statusCode: 400, msg: "Unable to submit" });


}