const roles = require("../../constants/roles");
const STATUS_CODE = require("../../constants/statusCode");
const userModel = require("../../model/user");
const bycrypt = require("../../utils/bycrypt");
const SendEmail = require("../../utils/emails/sendEmail");  
const jwt = require("../../utils/jwt");
const crypto = require("crypto");

exports.login = async (req, res) => {
  let email = req.body.email,
    password = req.body.password;
  if (!email || !password) {
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({
        msg: `${!email ? "Email" : "Password"} is required.`,
        statusCode: STATUS_CODE.BAD_REQUEST,
      });
    return;
  }

  const doc = await userModel.findOne({ email, role: roles.ADMIN }).select("+password");
  if (doc) {
    const isCorrect = bycrypt.comparePassword(password, doc.password);
    if (isCorrect) {
      // to hide password
      doc.password = null;

      const token = jwt.createJWT(doc);
      if (token) {
        await userModel.updateOne(
          { _id: doc._id },
          {
            $set: {
              token,
            },
          }
        );

        doc.token = token;
      }
      res
        .status(STATUS_CODE.OK)
        .json({ data: doc, statusCode: STATUS_CODE.OK });
      return;
    }
  }
  res
    .status(STATUS_CODE.NOT_FOUND)
    .json({ msg: "Admin not found", statusCode: STATUS_CODE.NOT_FOUND });
};


exports.getUsers = async (req, res) => {

  const status = req.query.status;
  let condition = {};
  if (status) {
    condition = {
      isVerified: status ? status : { $not: { $eq: true } }
    }
  }

  await userModel.find({ ...condition, role: roles.USER })
    .then((users) => {
      res.json({ statusCode: 200, users: users });
    })
    .catch((err) => {
      res.status(STATUS_CODE.NOT_FOUND).json({ msg: "Not found", statusCode: STATUS_CODE.NOT_FOUND })
    })
}
exports.updateUser = async (req, res) => {
  let ids = req.body.ids;
  let status = req.body.status;
  if (!ids) {
      res.status(STATUS_CODE.BAD_REQUEST).json({ msg: "Id is required.", statusCode: STATUS_CODE.BAD_REQUEST });
      return;
  }
  if (!status) {
      res.status(STATUS_CODE.BAD_REQUEST).json({ msg: "Status is required.", statusCode: STATUS_CODE.BAD_REQUEST });
      return;
  }

  await userModel.updateMany({_id: ids}, {
    $set: {
      isVerified: status === "accepted"? true: false,
      requestStatus: status,
    }
  })

  res.json({ statusCode: 200, msg: "Updated"});
  return;
}