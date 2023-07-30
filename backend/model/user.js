const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Invalid Email"],
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "Male", "Female", "other", "Other"],
            message: "Gender must be male, female or other",
        },
    },
    address: {
        type: String,
        // required: [true, "Address is required"],
    },
    password: {
        type: String,
        minlength: [8, "Password minimum length must be 8 characters"],
        required: [true, "Password is required"],
        select: false,
    },
    banned: {
        type: Boolean,
        default: false,
    },
    emailVerificationCode: {
        type: String,
        select: false,
    },
    phoneVerificationCode: {
        type: String,
        select: false,
    },
    emailVerificationTokenExpires: {
        type: Date,
        select: false,
    },
    phoneVerificationTokenExpires: {
        type: Date,
        select: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
        select: false,
    },
    forgotPasswordTokenExpires: {
        type: Date,
        select: false,
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: {
            values: [
                "admin",
                "user",
            ],
            message:
                "Role Must be admin or user",
        },
        required: [true, "Role is required"],
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})


userSchema.methods.createEmailVerifyToken = async function () {
    let token;
    do {
        token = Math.floor(100000 + Math.random() * 900000).toString();
    } while (
        await userModel.findOne({
            emailVerificationCode: crypto
                .createHash("sha256")
                .update(token)
                .digest("hex"),
        })
    );
    this.emailVerificationCode = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    this.emailVerificationTokenExpires = Date.now() + 10 * 60 * 1000;
    return token;
};

userSchema.methods.createPhoneVerifyToken = async function () {
    let token;
    do {
      token = Math.floor(100000 + Math.random() * 900000).toString();
    } while (
      await User.findOne({
        phoneVerificationCode: crypto
          .createHash("sha256")
          .update(token)
          .digest("hex"),
      })
    );
    this.phoneVerificationCode = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    this.phoneVerificationTokenExpires = Date.now() + 10 * 60 * 1000;
    return token;
};

userSchema.methods.createForgotPasswordToken = async function () {
    let token;
    do {
        token = Math.floor(100000 + Math.random() * 900000).toString();
    } while (
        await userModel.findOne({
            forgotPasswordToken: crypto
                .createHash("sha256")
                .update(token)
                .digest("hex"),
        })
    );
    this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    this.forgotPasswordTokenExpires = Date.now() + 10 * 60 * 1000;
    return token;
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;