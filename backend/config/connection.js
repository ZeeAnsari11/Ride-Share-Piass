const mongoose = require("mongoose");
require("dotenv").config();

console.log("=================", process.env.MONGO_URL);

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Database connected"))
//   .catch((err) => console.log("Database connection error", err));

  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
  })
  .then(() => {
      console.log("Connection Established with database.");
  })
  .catch((e) => console.log('Database connection Failed!',e))


  