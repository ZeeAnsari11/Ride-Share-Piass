const SaveToPublic = require("../../utils/saveFileToPublic");
const RidePost = require("../../model/Ride");
const STATUS_CODE = require("../../constants/statusCode");

exports.create = async (req, res) => {
  let filePath = "";
  if (req.file) {
    filePath = SaveToPublic(req.file);
  }

  const ridepost = new RidePost({
    ...req.body,
    user: req.user._id,
    ridePicture: filePath,
    rideRoutes: req.body.rideRoutes?.split(",")
  });
  await ridepost.save();
  res.status(STATUS_CODE.CREATED).json({ msg: "Posted Successfully", data: ridepost, statusCode: STATUS_CODE.CREATED });
};

exports.getPostById = async (req, res) => {
  try {
    const ridePosts = await RidePost.find({ _id: req.params.id });
    res.status(STATUS_CODE.OK).json({ msg: "Fetch Successfully", data: ridePosts, statusCode: STATUS_CODE.OK });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAll = async (req, res) => {
  try {
    const ridePosts = await RidePost.find().populate("user");
    res.status(STATUS_CODE.OK).json({ msg: "Fetch Successfully", data: ridePosts, statusCode: STATUS_CODE.OK });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const ridePost = await RidePost.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(ridePost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.myPosts = async (req, res) => {
  try {
    // const { id } = req.params.id;
    let myPosts = await RidePost.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      data: myPosts
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    console.log("=============11====7878878======",);
    // const { id } = req.params.id;
    await RidePost.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: 'Deleted Successfully'
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  let search = req.query.search,
    sortParam = req.query.sort,
    date = req.query.date,
    location = req.query.location,
    price = req.query.price;
  let sort = {
    id: -1,
  }

  let condition = {
  };
  if (search && search.trim()) {
    condition.$and = [
      ...(condition.$and || []),
      {
        $or: [
          { "endLocation": { "$regex": search, "$options": "i" } },
          { "startLocation": { "$regex": search, "$options": "i" } },
          { "rideRoutes": { "$regex": search, "$options": "i" } },

        ]
      }
    ]
  }
  if (location) {
    condition.$and = [
      ...(condition.$and || []),
      {
        $or: [
          { "endLocation": { "$regex": location, "$options": "i" } },
          { "startLocation": { "$regex": location, "$options": "i" } },
          { "rideRoutes": { "$regex": location, "$options": "i" } },
        ]
      }
    ]
  }
  if (price) {
    condition.$and = [
      ...(condition.$and || []),
      { price: { $lt: price } }
    ]
  }
  if (date) {
    condition.$and = [
      ...(condition.$and || []),
      { date: { $lte: date } }
    ]
  }
  if (sortParam) {
    try {
      sort = JSON.parse(sortParam);
    } catch (err) { }
  }

  await RidePost.find(condition).sort(sort)
    .then(doc => {
      if (doc) {
        res.status(STATUS_CODE.OK).json({ data: doc, statusCode: STATUS_CODE.OK });
        return;
      }
      res.status(STATUS_CODE.NOT_FOUND).json({ msg: "Not found", statusCode: STATUS_CODE.NOT_FOUND });
    })
};
