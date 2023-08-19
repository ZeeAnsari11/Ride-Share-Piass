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
