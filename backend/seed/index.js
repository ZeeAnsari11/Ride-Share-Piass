const userModel = require("../model/user");
const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Established with database.");
    })
    .catch((e) => console.log("Database connection Failed!", e));
  await userModel.updateOne(
    { _id: "64e0a01d49c48af03a2bcfb9" },
    {
      $set: {
        fullName: "Arslan Ameen",
        email: "admin@rideshare.com",
        phone: "923221413593",
        // password: 123456
        password:
          "$2a$08$f7Dlnv77nIEDy2FNgeF/wuC7/BtZS9g5k4P9K2HhVpo.oP7h33pkO",
        verified: true,
        banned: false,
        isEmailVerified: true,
        isPhoneVerified: true,
        role: "admin",
        __v: 0,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGF0YSI6eyJpZCI6IjY0ZTA5ZjY4NDljNDhhZjAzYTJiY2ZiNiJ9LCJpYXQiOjE2OTI0NDM0NzgsImV4cCI6Njg3NjQ0MzQ3OH0.oMxh2suBvTezuTui_kRTlHSnppQMTNP1WwSMx92_8rg",
        address: "kasur",
      },
    },
    { upsert: true }
  )
  .then(data=>{
    console.log("Seed Success")
  })
  .catch(err=>{
    console.log("Seed Error", err)
  });
})();
