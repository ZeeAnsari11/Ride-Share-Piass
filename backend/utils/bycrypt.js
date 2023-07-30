const bcrypt = require('bcryptjs');
exports.hashPassword = (password)=>{
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
}

exports.comparePassword = (givenPassword = "", correctPassword = "")=>{
    console.log("Passoword =====>", givenPassword, correctPassword)
    return bcrypt.compareSync(givenPassword, correctPassword);
}