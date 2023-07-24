const roles = require("../../constants/roles");
const STATUS_CODE = require("../../constants/statusCode");
const userModel = require("../../model/user");

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