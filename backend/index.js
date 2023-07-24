const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const notFound = require("./middlewares/notfound");
const router = require("./routes/router");
const errorHandler = require("./controller/error/error");
const PostsRouter = require("./controller/posts");
const morgan = require("morgan");


const PORT = process.env.PORT || 4000;
require("./config/connection");
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/views'))); 
app.use("/public", express.static(path.join(__dirname, '/public'))); 
app.get("/", (req, res, next)=>{
   res.sendFile(path.join(__dirname, "/views", "Welcome.html"));
})
app.use(morgan('dev'))
app.use("/api", router);
app.use(errorHandler);
app.use(notFound);

app.use("/api/v1/", PostsRouter)



app.listen(PORT, ()=>console.log(`Server is started at http://localhost:${PORT}`));