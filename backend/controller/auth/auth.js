const STATUS_CODE = require("../../constants/statusCode");
const userModel = require("../../model/user");
const bycrypt = require("../../utils/bycrypt");
const SendEmail = require("../../utils/emails/sendEmail");
const jwt = require("../../utils/jwt");
const crypto = require("crypto");

exports.login = async (req, res)=>{
        let email = req.body.email, 
        password = req.body.password;
        if(!email || !password){
            res.status(STATUS_CODE.BAD_REQUEST).json({msg: `${!email ? "Email" : "Password"} is required.`, statusCode: STATUS_CODE.BAD_REQUEST});
            return;
        }

        const doc = await userModel.findOne({email}).select("+password");
        if(doc){
            const isCorrect = await bycrypt.comparePassword(password, doc.password);
            if(isCorrect){
                // to hide password
                doc.password = null;

                const token = jwt.createJWT(doc);
                if(token){
                    await userModel.updateOne({_id: doc._id}, {
                        $set: {
                            token,
                        }
                    });

                    doc.token = token;
                }
                res.status(STATUS_CODE.OK).json({data: doc, statusCode: STATUS_CODE.OK});
                return
            }
        }
        res.status(STATUS_CODE.NOT_FOUND).json({msg: "User not found", statusCode: STATUS_CODE.NOT_FOUND});
}

exports.signup = async (req, res)=>{
        let email = req.body.email;
        let password = req.body.password;
        let role = req.body.role;
        if(!email){
            res.status(STATUS_CODE.BAD_REQUEST).json({msg: "Email is required", statusCode: STATUS_CODE.BAD_REQUEST});
            return;
        }
        if(!password){
            res.status(STATUS_CODE.BAD_REQUEST).json({msg: "Password is required", statusCode: STATUS_CODE.BAD_REQUEST});
            return;
        }

        if(!role){
            res.status(STATUS_CODE.BAD_REQUEST).json({msg: `Role is required.`, statusCode: STATUS_CODE.BAD_REQUEST});
            return;
        }
        const isExist = await userModel.findOne({email});
        if(isExist){
            res.status(STATUS_CODE.BAD_REQUEST).json({msg: "User already exist with same email", statusCode: STATUS_CODE.BAD_REQUEST});
            return;
        }

        const hashPassword = await bycrypt.hashPassword(password);
        if(hashPassword){
            req.body.password = hashPassword;            
            const data = new userModel(req.body);
            await data.save()
            res.status(STATUS_CODE.OK).json({msg: `${req.body.role} created successfully`, statusCode: STATUS_CODE.CREATED});
            return;
        }

        res.status(STATUS_CODE.SERVER_ERROR).json({msg: `Unable to hash password`, statusCode: STATUS_CODE.SERVER_ERROR});
        return;

}

exports.verify = async (req, res)=>{
        let token = req.body.token;
        if(token){
            const payload = jwt.verify(token);
            if(payload && payload.userdata){
                const user = await userModel.findOne({_id: payload.userdata.id});
                if(user){
                    res.status(STATUS_CODE.OK).json({msg: "User verified successfully", data: user, statusCode: STATUS_CODE.OK});
                    return;
                }
            }
        }
        
        res.status(STATUS_CODE.UNAUTHORIZED).json({msg: "Unauthorized access", statusCode: STATUS_CODE.UNAUTHORIZED});
        return;
}

exports.sendEmailVerificationCode = async (req, res)=>{
        let email = req.body.email;
        if(!email){
            res.status(STATUS_CODE.BAD_REQUEST).json({msg: "Email is required", statusCode: STATUS_CODE.BAD_REQUEST});
            return;
        }
        let user = await userModel.findOne({email});
        if(!user){
            res.status(STATUS_CODE.NOT_FOUND).json({msg: "User not found", statusCode: STATUS_CODE.NOT_FOUND});
            return;
        }
        const verificationToken = await user.createEmailVerifyToken();
        await user.save({ validateBeforeSave: false });
        SendEmail(email, verificationToken)
        .catch(err=>{
            console.log(err);
            throw Error("Email send error");
        });
        res.status(STATUS_CODE.OK).json({statusCode: STATUS_CODE.OK, msg: "Email verification code sent to your email"});
}

exports.verifyEmailVerificationCode = async (req, res)=>{
        let email = req.body.email;
        let code = req.body.code;
        if(!email){
            res.status(STATUS_CODE.BAD_REQUEST).json({msg: "Email is required", statusCode: STATUS_CODE.BAD_REQUEST});
            return;
        }
        if(!code){
            res.status(STATUS_CODE.BAD_REQUEST).json({msg: "Verification code is required", statusCode: STATUS_CODE.BAD_REQUEST});
            return;
        }

        code = crypto
        .createHash("sha256")
        .update(code)
        .digest("hex");

        let user = await userModel.findOneAndUpdate({email, emailVerificationCode: code, emailVerificationTokenExpires: {$gte: Date.now()}},{
            $set: {
                isEmailVerified: true,
            }
        });
        
        if(!user){
            res.status(STATUS_CODE.NOT_FOUND).json({msg: "Invalid Token or Token Expired", statusCode: STATUS_CODE.NOT_FOUND});
            return;
        }

        res.status(STATUS_CODE.OK).json({statusCode: STATUS_CODE.OK, data: user, msg: "User email verified successfully"});
}
