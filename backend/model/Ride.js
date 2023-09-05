var mongoose = require('mongoose')
  , Schema = mongoose.Schema

const ridepostSchema = new mongoose.Schema({
  rideType: {
    type: String,
    enum: {
      values: ["car", "bike"],
    },
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  rideNumber: { type: String, required: true },
  rideColor: { type: String, required: true },
  ridePicture: { type: String, required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  noofPassenger: { type: Number, required: true },
  passengers: { type: [mongoose.Schema.Types.ObjectId] },
  date: { type: Date, required: true },
  rideRoutes: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    defaultValue: Date.now()
  }
});
const RidePost = mongoose.model("RidePost", ridepostSchema);
module.exports = RidePost;
